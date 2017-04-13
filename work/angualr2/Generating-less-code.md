## 目标
Angular的`AoT`编译器将每个模板生成大量的代码。如果我们的项目中还额外拓展使用了大量的原型和方法并且还没有压缩，那么这种情况就更加严重了。（代码变得更多了）

因为`AoT`能提供高性能的表现，所以我们到目前为止也没有将整件事放在首位。

然而，还有新的和Angular一样的高性能框架，但生成了体积更小的模板。（就是生成了更少的代码）。说明其实我们还对生成代码这件事做得更好。

这份文档提出了一种新的代码生成方式，这种方式能够让我们的生成后的项目体积有较大的改善，特别是对于 external users（外部用户？）
## 背景

### 例子
#### 源码
一个简单的 tree component

```
@Component({
  selector: 'tree',
  inputs: ['data'],
  template: `
<span [style.backgroundColor]="bgColor"> {{data.value}} </span>
<tree *ngIf='data.left != null' [data]='data.left'></tree>
<tree *ngIf='data.right != null' [data]='data.right'></tree>
`})
export class TreeComponent {
  data: TreeNode;
  get bgColor(): string { ... }
}

interface TreeNode {
  value: string;
  left?: TreeNode;
  right?: TreeNode;
}
```

### 当前生成的代码
```
class View_TreeComponent_1 extends import34.DebugAppView<any> {
  _el_0:any;
  compView_0:import34.AppView<import1.TreeComponent>;
  _TreeComponent_0_3:Wrapper_TreeComponent;
  constructor(viewUtils:import16.ViewUtils,parentView:import34.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import40.ViewContainer) {
    super(View_TreeComponent_1,renderType_TreeComponent,import37.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import38.ChangeDetectorStatus.CheckAlways,nodeDebugInfos_TreeComponent1,declaredViewContainer);
  }
  createInternal(rootSelector:string):import39.ComponentRef<any> {
    this._el_0 = import16.createRenderElement(this.renderer,(null as any),'tree',import16.EMPTY_INLINE_ARRAY,this.debug(0,0,63));
    this.compView_0 = new View_TreeComponent_0(this.viewUtils,this,0,this._el_0);
    this._TreeComponent_0_3 = new Wrapper_TreeComponent();
    this.compView_0.create(this._TreeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import1.TreeComponent) && (0 === requestNodeIndex))) { return this._TreeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal():void {
    const currVal_0_0_0:any = this.parentView.context.data.right;
    this._TreeComponent_0_3.check_data(this,currVal_0_0_0,false);
    this._TreeComponent_0_3.ngDoCheck(this,this._el_0);
    this.compView_0.internalDetectChanges(this.throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
class View_TreeComponent_2 extends import34.DebugAppView<any> {
  _el_0:any;
  compView_0:import34.AppView<import1.TreeComponent>;
  _TreeComponent_0_3:Wrapper_TreeComponent;
  constructor(viewUtils:import16.ViewUtils,parentView:import34.AppView<any>,parentIndex:number,parentElement:any,declaredViewContainer:import40.ViewContainer) {
    super(View_TreeComponent_2,renderType_TreeComponent,import37.ViewType.EMBEDDED,viewUtils,parentView,parentIndex,parentElement,import38.ChangeDetectorStatus.CheckAlways,nodeDebugInfos_TreeComponent2,declaredViewContainer);
  }
  createInternal(rootSelector:string):import39.ComponentRef<any> {
    this._el_0 = import16.createRenderElement(this.renderer,(null as any),'tree',import16.EMPTY_INLINE_ARRAY,this.debug(0,0,123));
    this.compView_0 = new View_TreeComponent_0(this.viewUtils,this,0,this._el_0);
    this._TreeComponent_0_3 = new Wrapper_TreeComponent();
    this.compView_0.create(this._TreeComponent_0_3.context);
    this.init(this._el_0,((<any>this.renderer).directRenderer? (null as any): [this._el_0]),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import1.TreeComponent) && (0 === requestNodeIndex))) { return this._TreeComponent_0_3.context; }
    return notFoundResult;
  }
  detectChangesInternal():void {
    const currVal_0_0_0:any = this.parentView.context.data.left;
    this._TreeComponent_0_3.check_data(this,currVal_0_0_0,false);
    this._TreeComponent_0_3.ngDoCheck(this,this._el_0);
    this.compView_0.internalDetectChanges(this.throwOnChange);
  }
  destroyInternal():void {
    this.compView_0.destroy();
  }
  visitRootNodesInternal(cb:any,ctx:any):void {
    cb(this._el_0,ctx);
  }
}
var renderType_TreeComponent:import29.RenderComponentType = import16.createRenderComponentType('/private/var/folders/00/1nd18000h01000cxqpysvccm006nm5/T/e2e_test.1483634509/benchmarks/src/tree/ng2/tree.ts class TreeComponent - inline template',0,import36.ViewEncapsulation.None,styles_TreeComponent,{});
export class View_TreeComponent_0 extends import34.DebugAppView<import1.TreeComponent> {
  _el_0:any;
  _text_1:any;
  _anchor_2:any;
  /*private*/ _vc_2:import40.ViewContainer;
  _TemplateRef_2_5:any;
  _NgIf_2_6:import43.Wrapper_NgIf;
  _anchor_3:any;
  /*private*/ _vc_3:import40.ViewContainer;
  _TemplateRef_3_5:any;
  _NgIf_3_6:import43.Wrapper_NgIf;
  /*private*/ _expr_10:any;
  /*private*/ _expr_11:any;
  constructor(viewUtils:import16.ViewUtils,parentView:import34.AppView<any>,parentIndex:number,parentElement:any) {
    super(View_TreeComponent_0,renderType_TreeComponent,import37.ViewType.COMPONENT,viewUtils,parentView,parentIndex,parentElement,import38.ChangeDetectorStatus.CheckAlways,nodeDebugInfos_TreeComponent0);
    this._expr_10 = (undefined as any);
    this._expr_11 = (undefined as any);
  }
  createInternal(rootSelector:string):import39.ComponentRef<any> {
    const parentRenderNode:any = this.renderer.createViewRoot(this.parentElement);
    this._el_0 = import16.createRenderElement(this.renderer,parentRenderNode,'span',import16.EMPTY_INLINE_ARRAY,this.debug(0,0,0));
    this._text_1 = this.renderer.createText(this._el_0,'',this.debug(1,0,40));
    this._anchor_2 = this.renderer.createTemplateAnchor(parentRenderNode,this.debug(2,0,63));
    this._vc_2 = new import40.ViewContainer(2,(null as any),this,this._anchor_2);
    this._TemplateRef_2_5 = new import41.TemplateRef_(this,2,this._anchor_2);
    this._NgIf_2_6 = new import43.Wrapper_NgIf(this._vc_2.vcRef,this._TemplateRef_2_5);
    this._anchor_3 = this.renderer.createTemplateAnchor(parentRenderNode,this.debug(3,0,123));
    this._vc_3 = new import40.ViewContainer(3,(null as any),this,this._anchor_3);
    this._TemplateRef_3_5 = new import41.TemplateRef_(this,3,this._anchor_3);
    this._NgIf_3_6 = new import43.Wrapper_NgIf(this._vc_3.vcRef,this._TemplateRef_3_5);
    this.init((null as any),((<any>this.renderer).directRenderer? (null as any): [
      this._el_0,
      this._text_1,
      this._anchor_2,
      this._anchor_3
    ]
    ),(null as any));
    return (null as any);
  }
  injectorGetInternal(token:any,requestNodeIndex:number,notFoundResult:any):any {
    if (((token === import41.TemplateRef) && (2 === requestNodeIndex))) { return this._TemplateRef_2_5; }
    if (((token === import42.NgIf) && (2 === requestNodeIndex))) { return this._NgIf_2_6.context; }
    if (((token === import41.TemplateRef) && (3 === requestNodeIndex))) { return this._TemplateRef_3_5; }
    if (((token === import42.NgIf) && (3 === requestNodeIndex))) { return this._NgIf_3_6.context; }
    return notFoundResult;
  }
  detectChangesInternal():void {
    const currVal_2_0_0:any = (this.context.data.right != (null as any));
    this._NgIf_2_6.check_ngIf(this,currVal_2_0_0,false);
    this._NgIf_2_6.ngDoCheck(this,this._anchor_2);
    const currVal_3_0_0:any = (this.context.data.left != (null as any));
    this._NgIf_3_6.check_ngIf(this,currVal_3_0_0,false);
    this._NgIf_3_6.ngDoCheck(this,this._anchor_3);
    this._vc_2.detectChangesInNestedViews(this.throwOnChange);
    this._vc_3.detectChangesInNestedViews(this.throwOnChange);
    const currVal_10:any = this.context.bgColor;
    import16.checkRenderStyle(this,this._el_0,'backgroundColor',(null as any),this._expr_10,(this._expr_10 = currVal_10),false,import30.SecurityContext.STYLE);
    const currVal_11:any = import16.inlineInterpolate(1,' ',this.context.data.value,' ');
    import16.checkRenderText(this,this._text_1,this._expr_11,(this._expr_11 = currVal_11),false);
  }
  destroyInternal():void {
    this._vc_2.destroyNestedViews();
    this._vc_3.destroyNestedViews();
  }
  createEmbeddedViewInternal(nodeIndex:number):import34.AppView<any> {
    if ((nodeIndex == 2)) { return new View_TreeComponent_1(this.viewUtils,this,2,this._anchor_2,this._vc_2); }
    if ((nodeIndex == 3)) { return new View_TreeComponent_2(this.viewUtils,this,3,this._anchor_3,this._vc_3); }
    return (null as any);
  }
}
```

### Closure minified
After closure minification this looks like this:
```
/ View_TreeComponent_0 ctor
var Gj = new kg("tree", Mj, Fj), Oj = W.Qh(), Nj = function(a, b, c, d) {
  Jh.call(this, Nj, Oj, X.ib, a, b, c, d, P.Ib);
  this.Kg = this.Jg = U;
};
v(Nj, Jh);
h = Nj.prototype;
// createInternal
h.Ja = function() {
  var a = this.h.oe(this.parentElement);
  this.g = W.le(this.h, a, "span", W.vc, null);
  this.mh = this.h.ne(this.g, "", null);
  this.Kb = this.h.Tc(a, null);
  this.Jc = new Lh(2, null, this, this.Kb);
  this.$f = new ph(this, 2, this.Kb);
  this.wd = new Uh(this.Jc.Fi, this.$f);
  this.Lb = this.h.Tc(a, null);
  this.Kc = new Lh(3, null, this, this.Lb);
  this.ag = new ph(this, 3, this.Lb);
  this.xd = new Uh(this.Kc.Fi, this.ag);
  this.init(null, this.h.bc ? null : [this.g, this.mh, this.Kb, this.Lb], null);
  return null;
};
// injectorGetInternal
h.ic = function(a, b, c) {
  return a === oh && 2 === b ? this.$f : a === Rh && 2 === b ? this.wd.context : a === oh && 3 === b ? this.ag : a === Rh && 3 === b ? this.xd.context : c;
};
// detectChangesInternal
h.ac = function(a) {
  Vh(this.wd, null != this.context.data.right, a);
  this.wd.zb(this, this.Kb, a);
  Vh(this.xd, null != this.context.data.left, a);
  this.xd.zb(this, this.Lb, a);
  Mh(this.Jc, a);
  Mh(this.Kc, a);
  var b = this.context.bgColor;
  W.Rc(a, this.Jg, b) && (this.h.xf(this.g, "backgroundColor", null == zj(b) ? null : zj(b).toString()), this.Jg = b);
  b = W.tk(this.context.data.value);
  W.Rc(a, this.Kg, b) && (this.h.ld(this.mh, b), this.Kg = b);
};
// destroyInternal
h.Wa = function() {
  Nh(this.Jc);
  Nh(this.Kc);
};
// createEmbeddedViewInternal
h.Nh = function(a) {
  return 2 == a ? new Pj(this.tc, this, 2, this.Kb, this.Jc) : 3 == a ? new Qj(this.tc, this, 3, this.Lb, this.Kc) : null;
};
// --------------------------
// View_TreeComponent_1 ctor
var Pj = function(a, b, c, d, e) {
  Jh.call(this, Pj, Oj, X.rd, a, b, c, d, P.Ib, e);
};
v(Pj, Jh);
h = Pj.prototype;
// createInternal
h.Ja = function() {
  this.g = W.le(this.h, null, "tree", W.vc, null);
  this.ga = new Nj(this.tc, this, 0, this.g);
  this.T = new Jj;
  this.ga.create(this.T.context);
  this.init(this.g, this.h.bc ? null : [this.g], null);
  return null;
};
// injectorGetInternal
h.ic = function(a, b, c) {
  return a === Fj && 0 === b ? this.T.context : c;
};
// detectChangesInternal
h.ac = function(a) {
  Kj(this.T, this.Cb.context.data.right, a);
  this.T.zb(this, this.g, a);
  Kh(this.ga, a);
};
// destroyInternal
h.Wa = function() {
  this.ga.destroy();
};
// visitRootNodesInternal
h.hb = function(a, b) {
  a(this.g, b);
};

// --------------------------
// View_TreeComponent_2 ctor
var Qj = function(a, b, c, d, e) {
  Jh.call(this, Qj, Oj, X.rd, a, b, c, d, P.Ib, e);
};
v(Qj, Jh);
h = Qj.prototype;
// createInternal
h.Ja = function() {
  this.g = W.le(this.h, null, "tree", W.vc, null);
  this.ga = new Nj(this.tc, this, 0, this.g);
  this.T = new Jj;
  this.ga.create(this.T.context);
  this.init(this.g, this.h.bc ? null : [this.g], null);
  return null;
};
// injectorGetInternal
h.ic = function(a, b, c) {
  return a === Fj && 0 === b ? this.T.context : c;
};
// detectChangesInternal
h.ac = function(a) {
  Kj(this.T, this.Cb.context.data.left, a);
  this.T.zb(this, this.g, a);
  Kh(this.ga, a);
};
// destroyInternal
h.Wa = function() {
  this.ga.destroy();
};
// visitRootNodesInternal
h.hb = function(a, b) {
  a(this.g, b);
};

```
 ### 统计
||bytes|ratio|bytes (gzip)|ratio (gzip)|
|:--|:--|:--|:--|:--|
|Source template + annotation|245|1x|159|1x|
|Generated code (TS, non minified)|7951|32.5x|1710|10.8x|
|Generated code (ES5, non minified)|8113|33x|1455|9.1x|
|Generated code (ES5, Closure Compiler minified)|2693|11.9x|746|4.7x|

注意：
- 上面的提到的体积不包括`import`语句
- gzip的体积计算包括了gzip的命令，因此从体积中减去了这30个字节（"Content-Encoding: gzip\n"）

### 竞争对手的性能
#### Inferno.js 树基准（Tree Benchmark）
`Inferno.js` 是类似 React 的高性能的框架

基准（Benchmark）细节：
- 检查他们没有重用DOM节点
- 当节点不再使用时，就不再跟踪元素或者视图的身份

||Current Angular|Inferno.js|
|:--|:--|:--|
|createDestroy (time in ms)|76.66+-3%|66.97+-7%|
|createDestroy (gc in bytes)|11588.22+-8%|3012.58+-175%|
|update (time in ms)|13.37+-7%|52.55+-8%|
|update (gc in bytes)|235.60+-435%|1789.89+-238%|

总结：
- inferno 在create/Destroy上比anglar稍快，并且使用了更少的内存。（相差4倍）
- angular 在create时比 inferno 快了四倍，并且inferno 占用的内存是angular的7倍，但是它让渲染部分树时变得简单，这种差异也不再变得很大。
- inferno 拥有很好的属性
    - 小(9kb min gzip)
    - 通过使用任意的javascript渲染让开发/控制流变得更简单
[infernojs](https://github.com/infernojs/inferno/)
[性能对比](http://stefankrause.net/js-frameworks-benchmark4/webdriver-ts/table.html)

### 考虑替代方案
一种简单的解决方案是直接输出简化的代码，这对于那些接受我们的用户而言只是让问题稍有缓和。但并不是最佳的，最好的方式是我们生成和 Closure Compiler类似的输出。对于过早使用 Closure Compiler 来说并不太好。

### 现有技术
Angular2 在不同版本的代码生成

## 细节的设计
### 大纲
如下方式定义views
- 一种需要通过创建DOM节点和指令实例的迭代方式的数据结构,有一项 元素/指令/query
- 有一种可以包括所有绑定的模板的更新方法，有一个声明对于每个元素/指令/query
- 一个 handleEvent 方法用来包含所有在模板中的事件表达式

引进视图引擎服务
- 它是负责创建上述数据结构的视图
- 拥有更新元素/指令/queries的方法

假设我们已经有如下类型的帮助函数
```
function viewDef(
  nodes: (ElementDef | TextDef | TemplateDef | 
          DirectiveDef | ComponentDef)[];
  update: (ve: ViewEngine, view: View, comp: any) => void,
  handleEvent: (ve: ViewEngine, view: View, cmp: any, index: number, 
                event: any) => boolean
): View { // converts arguments into object ... }

function elementDef(
  parent: number,

function viewDef(
  nodes: (ElementDef | TextDef | TemplateDef | 
          DirectiveDef | ComponentDef)[];
  update: (ve: ViewEngine, view: View, comp: any) => void,
  handleEvent: (ve: ViewEngine, view: View, cmp: any, index: number, 
                event: any) => boolean
): View { // converts arguments into object ... }

function elementDef(
  parent: number,
  childCount: number,
  name: string,
): ElementDef { // converts arguments into object ... }

function textDef(
  parent: number
): TextDef { // converts arguments into object ... }

function templateDef(
  parent: number,
  childCount: number,
  viewDef: ViewDefinition
): TemplateDef { // converts arguments into object ... }

function directiveDef(
  elIndex: number,
  ctor: any,
  deps: DepDef
):DirectiveDef { // converts arguments into object ... }

function depDef(
  token: any,
  index: number
): DepDef { // converts arguments into object ... }

function componentDef(
  elIndex: number,
  ctor: any,
  deps: (number | any)[],
  // Note: Need the closure to be able to
  // resolve cycles
  viewDef: () => ViewDefinition
): ComponentDef { // converts arguments into object ... }


interface ViewEngine {
  createEmbeddedView(
    viewDef: ViewDefinition,
    parent: View, parentIndex: number): View;

  updateElement(view: View, index: number,
    styles: {[key:string]: any}): void;
  updateText(view: View, index: number, value: string): void;
  updateDirective(view: View, index: number,
    props: {[key: string]: any}): void;
  updateViewContainer(view: View, index: number): void;
  updateComponent(view: View, index: number,
    props: {[key: string]: any}): void;
}
```

我们可以生成下面的代码用来表示上面例子中的树。

```
const TreeComponent_1_ViewDef = viewDef(
  [
    elementDef(null, 1, 'tree'),
    componentDef(0, TreeComponent, [], () => View_TreeComponent_0)
  ],
  (ve: ViewEngine, view: View, comp: TreeComponent) => {
    ve.updateComponent(view, 1, {data: comp.data.left}
      /* as {data: TreeComponent['data']}*/);
  }
);


const TreeComponent_1_ViewDef = viewDef(
  [
    elementDef(0, null, 1, 'tree'),
    componentDef(0, TreeComponent, [], () => View_TreeComponent_0)
  ],
  (ve: ViewEngine, view: View, comp: TreeComponent) => {
    ve.updateComponent(view, 1, {data: comp.data.right}
      /* as {data: TreeComponent['data']}*/);
  }
);

const TreeComponent_0_ViewDef = viewDef(
  [
    elementDef(null, 1, 'span'),
    textDef(0),
    templateDef(null, 1, View_TreeComponent_1),
    directiveDef(2, NgIf, [
      depDef(ViewContainerRef, 2),
      depDef(TemplateRef, 2)
    ]),
    templateDef(null, 1, View_TreeComponent_2),
    directiveDef(2, NgIf, [
      depDef(ViewContainerRef, 4),
      depDef(TemplateRef, 4)
    ]),
  ],
  (ve: ViewEngine, view: View, comp: TreeComponent) => {
    ve.updateElement(view, 0, {'background-color': comp.bgColor});
    ve.updateText(view, 1, interpolate(1,' ', comp.data.value,' '));
    ve.updateDirective(view, 3, {ngIf: comp.data.left}
      /* as {ngIf: NgIf['ngIf']}*/);
    ve.updateDirective(view, 5, {ngIf: comp.data.right}
      /* as {ngIf: NgIf['ngIf']}*/);

    ve.updateViewContainer(view, 2);
    ve.updateViewContainer(view, 4);
  }
);
```

### 新的 ideas
当进入时保持`ViewDefinition`为一个[展开的数组](https://lodash.com/docs/#flatMapDeep)并且添加`parent`,

- 可以让我们只在一个简单的循环里增加视图，只需要使用一个数组就一个产生结果（ element / directive / query）。也就是说我们不再需要使用递归或者其他复杂的数据结构了。

- 在计算children的总属性时还需要加上`childCount` 和 `flags`。（比如他们是否有设置`ngOnDestroy`）

