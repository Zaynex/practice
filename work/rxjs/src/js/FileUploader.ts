import { Observable, Observer, Subject } from 'rxjs'
const SparkMD5 = require('spark-md5')

interface FileInfo {
    fileSize: number,
    fileMD5: string,
    lastUpdated: string,
    fileName: string
}
const apiHost = 'http://127.0.0.1:5000/api'

const $attachment = document.querySelector('.attachment')
export class FileUploader {
    private file$ = Observable.fromEvent($attachment, 'change')
    .map((r: Event) => (r.target as HTMLInputElement).files[0])
    .filter(f => !!f)
    constructor(private concurrency = 3) {}
    uploadStream$ = this.file$
                        .switchMap(this.readFileInfo)
                        .switchMap(i => Observable.ajax.post(`${apiHost}/upload/chunk`, i.fileinfo)
                            .map((r) => {
                                const blobs = this.slice(i.file, r.response.chunks, r.response.chunkSize)
                                return {blobs, chunkMeta: r.response}
                            })
                        )
                        .switchMap(({blobs, chunkMeta}) => {
                            const dists = blobs.map((blob, index) => this.uploadChunk(chunkMeta, index, blob))
                            const uploadStream = Observable.from(dists)
                                .mergeAll(this.concurrency)

                                return Observable.forkJoin(uploadStream)
                                    .mapTo(chunkMeta)
                        })

    private readFileInfo(file: File): Observable<{file: File, fileinfo: FileInfo}> {
        const reader = new FileReader()
        const spark = new SparkMD5.ArrayBuffer()
        reader.readAsArrayBuffer(file)
        return Observable.create((observer: Observer<{file: File, fileinfo: FileInfo}>) => {
            reader.onload = (e: Event) => {
                spark.append((e.target as FileReader).result)
                const fileMD5 = spark.end()
                observer.next({
                    file, fileinfo: {
                        fileMD5, fileSize: file.size,
                        lastUpdated: file.lastModifiedDate.toISOString(),
                        fileName: file.name
                    }
                })
                observer.complete()
            }
            return () => {
                if(!reader.result) {
                    console.warn('read file aborted');
                    reader.abort()
                }
            }
        })
    }

    private uploadChunk(meta: ChunkMeta, index: number, blob: Blob) {
        const host = `${apiHost}/upload/chunk/${meta.fileKey}?chunk=${index + 1}&chunks={meta.chunks}`
        return Observable.ajax({
            url: host,
            body: blob,
            method: 'post',
            crossDomain: true,
            headers: {'Content-Type': 'application/octet-stream'}
        })
    }

    private slice(file: File, n: number, chunkSize: number): Blob[] {
        const result: Blob[] = []
        for(let i = 0; i < n; i++) {
            const startSize = i * chunkSize
            const slice = file.slice(startSize, i === n - 1? startSize + (file.size - startSize): (i+1)* chunkSize)
            result.push(slice)
        }
        return result
    }
}