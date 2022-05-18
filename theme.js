  /***js form Morgan***/
  /****************************思源API操作**************************/ 
  async function 设置思源块属性(内容块id, 属性对象) {
    let url = '/api/attr/setBlockAttrs'
    return 解析响应体(向思源请求数据(url, {
        id: 内容块id,
        attrs: 属性对象,
    }))
  }
  async function 向思源请求数据(url, data) {
    let resData = null
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            Authorization: `Token ''`,
        }
    }).then(function (response) { resData = response.json() })
    return resData
  }
  async function 解析响应体(response) {
    let r = await response
    return r.code === 0 ? r.data : null
  }
  
 
  /****UI****/
  function ViewSelect(selectid,selecttype){
  let button = document.createElement("button")
  button.id="viewselect"
  button.className="b3-menu__item"
  button.innerHTML='<svg class="b3-menu__icon" style="null"><use xlink:href="#iconGlobalGraph"></use></svg><span class="b3-menu__label" style="">视图选择</span><svg class="b3-menu__icon b3-menu__icon--arrow" style="null"><use xlink:href="#iconRight"></use></svg></button>'
  button.appendChild(SubMenu(selectid,selecttype))
  return button
}

function SubMenu(selectid,selecttype,className = 'b3-menu__submenu') {
  let node = document.createElement('div');
  node.className = className;
  if(selecttype=="NodeList"){
    node.appendChild(GraphView(selectid))
    node.appendChild(TableView(selectid))
	node.appendChild(kanbanView(selectid))
    node.appendChild(DefaultView(selectid))
  }
  if(selecttype=="NodeTable"){
    node.appendChild(FixWidth(selectid))
    node.appendChild(AutoWidth(selectid))
	node.appendChild(Removeth(selectid))
	node.appendChild(Defaultth(selectid))
  }
return node;
}

function GraphView(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","f")
  button.setAttribute("custom-attr-value","dt")

  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconFiles"></use></svg><span class="b3-menu__label">转换为导图</span>`
  button.onclick=ViewMonitor
  return button
}
function TableView(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","f")
  button.setAttribute("custom-attr-value","bg")

  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">转换为表格</span>`
  button.onclick=ViewMonitor
  return button
}
function kanbanView(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","f")
  button.setAttribute("custom-attr-value","kb")

  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconMenu"></use></svg><span class="b3-menu__label">转换为看板</span>`
  button.onclick=ViewMonitor
  return button
}
function DefaultView(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.onclick=ViewMonitor
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","f")
  button.setAttribute("custom-attr-value",'')

  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconList"></use></svg><span class="b3-menu__label">恢复为列表</span>`
  return button
}
function FixWidth(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.onclick=ViewMonitor
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","f")
  button.setAttribute("custom-attr-value","")

  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">页面宽度</span>`
  return button
}
function AutoWidth(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","f")
  button.setAttribute("custom-attr-value","auto")
  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">自动宽度</span>`
  button.onclick=ViewMonitor
  return button
}
function Removeth(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.onclick=ViewMonitor
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","t")
  button.setAttribute("custom-attr-value","biaotou")

  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">取消表头样式</span>`
  return button
}
function Defaultth(selectid){
  let button = document.createElement("button")
  button.className="b3-menu__item"
  button.setAttribute("data-node-id",selectid)
  button.setAttribute("custom-attr-name","t")
  button.setAttribute("custom-attr-value","")
  button.innerHTML=`<svg class="b3-menu__icon" style=""><use xlink:href="#iconTable"></use></svg><span class="b3-menu__label">默认表头样式</span>`
  button.onclick=ViewMonitor
  return button
}
function MenuSeparator(className = 'b3-menu__separator') {
  let node = document.createElement('button');
  node.className = className;
  return node;
}

/* 操作 */ 

/**
 * 获得所选择的块对应的块 ID
 * @returns {string} 块 ID
 * @returns {
 *     id: string, // 块 ID
 *     type: string, // 块类型
 *     subtype: string, // 块子类型(若没有则为 null)
 * }
 * @returns {null} 没有找到块 ID */
function getBlockSelected() {
    let node_list = document.querySelectorAll('.protyle:not(.fn__none)>.protyle-content .protyle-wysiwyg--select');
    if (node_list.length === 1 && node_list[0].dataset.nodeId != null) return {
        id: node_list[0].dataset.nodeId,
        type: node_list[0].dataset.type,
        subtype: node_list[0].dataset.subtype,
    };
    return null;
}

function ClickMonitor () {
  window.addEventListener('mouseup', MenuShow)
}

function MenuShow() {
  setTimeout(() => {
    let selectinfo = getBlockSelected()
      if(selectinfo){
      let selecttype = selectinfo.type
      let selectid = selectinfo.id
      if(selecttype=="NodeList"||selecttype=="NodeTable"){
        setTimeout(()=>InsertMenuItem(selectid,selecttype), 0)
      }
    }
  }, 0);
}


function InsertMenuItem(selectid,selecttype){
  let commonMenu = document.getElementById("commonMenu")
  let  readonly = commonMenu.querySelector(".b3-menu__item--readonly")
  let  selectview = commonMenu.querySelector('[id="viewselect"]')
  if(readonly){
    if(!selectview){
    commonMenu.insertBefore(ViewSelect(selectid,selecttype),readonly)
    commonMenu.insertBefore(MenuSeparator(),readonly)
    }
  }
}

function ViewMonitor(event){
  let id = event.currentTarget.getAttribute("data-node-id")
  let attrName = 'custom-'+event.currentTarget.getAttribute("custom-attr-name")
  let attrValue = event.currentTarget.getAttribute("custom-attr-value")
  let blocks = document.querySelectorAll(`.protyle-wysiwyg [data-node-id="${id}"]`)
  if(blocks){
    blocks.forEach(block=>block.setAttribute(attrName,attrValue))
  }
  let attrs={}
    attrs[attrName] =attrValue
  设置思源块属性(id,attrs)
}

setTimeout(()=>ClickMonitor(),1000)



  // 在工具栏添加按钮

function toolbarItemInit(toolbarConfig, handler,svgClassIndex = 0) {
  let fn = () => setTimeout(handler, 0);

  // 在工具栏添加按钮
  let node = toolbarItemInsert(toolbarConfig);
  let listener = (e) => e.addEventListener('click', (_) => fn());

  // 是否禁用该按钮
  toolbarItemChangeStatu(
      toolbarConfig.id,
      toolbarConfig.enable,
      undefined,
      'BUTTON',
      node,
      undefined,
      listener,
  )

  // 是否设置颜色
  if (svgClassIndex > 0 && svgClassIndex < svgClassList.length) {
      toolbarItemChangeStatu(
          toolbarConfig.id,
          true,
          true,
          'SVG',
          node,
          svgClassIndex,
      )
  }
  return fn;
}

function toolbarItemChangeStatu(
  id,
  enable = false,
  active = null,
  mode = 'DIV',
  node = null,
  svgClassIndex = 0,
  listener = null,
) {
  node = node || document.getElementById(id);
  if (node) {
      switch (mode.toUpperCase()) {
          case 'SVG':
              if (active !== null && svgClassIndex > 0) {
                  if (active) {
                      node.firstElementChild.classList.add(svgClassList[svgClassIndex]);
                  }
                  else {
                      node.firstElementChild.classList.remove(svgClassList[svgClassIndex]);
                  }
                  if (custom.theme.toolbar[id]) {
                      custom.theme.toolbar[id].state = active;
                      setTimeout(async () => saveCustomFile(custom), 0);
                  }
              }
              break;
          case 'DIV':
          case 'BUTTON':
          default:
              if (active !== null) {
                  if (active) {
                      node.classList.add('toolbar__item--active');
                  }
                  else {
                      node.classList.remove('toolbar__item--active');
                  }
                  if (custom.theme.toolbar[id]) {
                      custom.theme.toolbar[id].state = active;
                      setTimeout(async () => saveCustomFile(custom), 0);
                  }
              }

              if (enable) {
                  if (node.classList.contains('toolbar__item--disabled')) {
                      node.classList.remove('toolbar__item--disabled');
                  }
                  if (typeof listener === 'function') listener(node);
              }
              else {
                  if (!node.classList.contains('toolbar__item--disabled')) {
                      node.classList.add('toolbar__item--disabled');
                      recreateNode(node);
                  }
              }
              break;
      }
  }
}

function toolbarItemInsert(toolbarConfig) {
  let node = createToolbarItem(toolbarConfig);
  let toolbar = document.getElementById('toolbar');
  let referenceNode = document.getElementById('windowControls');
  return toolbar.insertBefore(node, referenceNode);
}

function createToolbarItem(toolbarConfig) {
  let item = document.createElement('BUTTON');
  let label = toolbarConfig.label.other;
  item.id = toolbarConfig.id;
  item.className = "toolbar__item b3-tooltips b3-tooltips__sw";
  item.setAttribute('aria-label', label);
  item.innerHTML = `<svg><use xlink:href="${toolbarConfig.icon}"></use></svg>`;
  return item;
}
var config = {
  width: {
    enable:false,
    toolbar: { // 菜单栏
        enable: true,
        display: true,
        id: 'toolbar-theme-style-render',
        label: {
            zh_CN: '启用A4视图',
            zh_CNT: null,
            fr_FR: null,
            en_US: null,
            other: 'A4',
        },
        icon: '#iconFile',
        index: 3,
    },
  },
}

let Fn_width = toolbarItemInit(
  config.width.toolbar,
  () => changeWidth(),
);


function changeWidth(){
  var a = document.querySelectorAll(".protyle-wysiwyg");
  if (a[0].style.width !== "17cm"){
    for (i = 0; i < a.length; i++) {
      a[i].style.width = "17cm";
      a[i].style.boxShadow = "0 4px 20px 0 rgba(0, 0, 0, 0.08)";
      a[i].style.setProperty('min-height','29.7cm');
      a[i].style.setProperty('margin','25px auto 50px','important');
      a[i].style.setProperty('border-top','solid 0px rgba(0, 0, 0, 0.08)');
    }
    config.width.enable = true;
  }else{
    for (i = 0; i < a.length; i++) {
      a[i].style.width = "calc(100% - 4cm)";
      a[i].style.boxShadow = "0 4px 20px 0 rgba(0, 0, 0, 0)";
      a[i].style.removeProperty('min-height');
      a[i].style.setProperty('margin','0px auto 0px','important');
      a[i].style.setProperty('border-top','solid 5px rgba(0, 0, 0, 0.08)');
    }
  }
}

