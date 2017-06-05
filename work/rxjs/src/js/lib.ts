export const createTodoItem = (val: string) => {
    const result = <HTMLLIElement>document.createElement('LI')
    result.classList.add('list-group-item')

    const innerHTML = `
        ${val}
        <button type="button"  class="btn btn-default button-remove" aria-label="right Align">
        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        <button>
    `

    result.innerHTML = innerHTML
    return result
}