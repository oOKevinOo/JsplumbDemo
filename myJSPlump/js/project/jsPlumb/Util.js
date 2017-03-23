/**
 * Created by Wang zhiwen on 2017/2/6.
 */
var Util = {
	//一下为ajax更新数据库方法
	updateNode: function(node, type) {
		//type参数暂时没用 该参数设计主要用来判断节点是否需要更新自己和所有连接与参数信息 如果添加该参数需要在Controller中修该方法参数
		$.ajax({
			type: "POST",
			url: "/project/savetask",
			data: node,
			success: function(msg) {
				if(msg.code != 1) {
					alert('erro accur:' + msg.msg);
				}
			}
		});
	},
	updateTaskParam: function(param) {
		$.ajax({
			type: "POST",
			url: "/project/saveParam",
			data: param,
			success: function(msg) {
				if(msg.code != 1) {
					alert('erro accur:' + msg.msg);
				}
			}
		});
	},
	delTask: function(id, json) {
		$.ajax({
			type: "POST",
			url: "/project/delTask",
			data: {
				taskId: id,
				taskJson: json
			},
			success: function(msg) {
				if(msg.code != 1) {
					alert('erro accur:' + msg.msg);
				}
			}
		});
	},
	delConnection: function(id) {
		$.ajax({
			type: "POST",
			url: "/project/delConnection",
			data: {
				'relId': id
			},
			success: function(msg) {
				if(msg.code != 1) {
					alert('erro accur:' + msg.msg);
				}
			}
		});
	},
	saveConnection: function(id, sid, tid) {
		$.ajax({
			type: "POST",
			url: "/project/saveConnection",
			data: {
				'relId': id,
				'task.taskId': sid,
				'toTaskId': tid,
			},
			success: function(msg) {
				if(msg.code != 1) {
					alert('erro accur:' + msg.msg);
				}
			}
		});
	},

	doPost: function(path, data) {
		var result = null;
		$.ajax({
			type: "POST",
			url: path,
			data: data,
			async: false,
			success: function(msg) {
				result = msg;
			}
		});
		return result;
	},

	doGet: function(path, data) {
		var result = null;
		$.ajax({
			type: "GET",
			url: path,
			data: data,
			success: function(msg) {
				result = msg;
			}
		});
		return result;
	},

	///////////////////////////////////////////////////////////////////

	//project中的c_window设置成jsPlumb对象 也是全局唯一的helper
	helper: new jsPlumbHelper('c_window'),

	getHelper: function() {
		if(this.helper.isInit == false) {
			this.helper.init();
		}
		return this.helper;
	},

	getJSPlumb: function() {
		return this.helper.getJsPlumbInstance();
	},

	//阻止事件冒泡
	stopBubble: function(e) {
		//如果提供了事件对象，则这是一个非IE浏览器
		if(e && e.stopPropagation)
		//因此它支持W3C的stopPropagation()方法
			e.stopPropagation();
		else
		//否则，我们需要使用IE的方式来取消事件冒泡
			window.event.cancelBubble = true;
	},

	//右边属性框icon改变时间 upDownEvent同样
	rightDownEvent: function(id) {
		var panel = $('#' + id).parent('.panel');
		var span = panel.children('span')[0];
		var $span = $(span);
		if($span.hasClass('glyphicon-chevron-down')) {
			$span.removeClass('glyphicon-chevron-down');
			$span.addClass('glyphicon-chevron-right');
			return;
		}

		if($span.hasClass('glyphicon-chevron-right')) {
			$span.removeClass('glyphicon-chevron-right');
			$span.addClass('glyphicon-chevron-down');
			return
		}
	},

	//the event of click contorller right span
	upDownEvent: function(e) {
		var span = $(this);
		span.toggleClass("glyphicon-chevron-up").toggleClass("glyphicon-chevron-down");
		if(span.hasClass("glyphicon-chevron-up")) {
			span.siblings("p").show();
		}
		if(span.hasClass("glyphicon-chevron-down")) {
			span.siblings("p").hide();
		}
		if(e && e.stopPropagation)
		//因此它支持W3C的stopPropagation()方法
			e.stopPropagation();
		else
		//否则，我们需要使用IE的方式来取消事件冒泡
			window.event.cancelBubble = true;
	},

	/**
	 * @description 鼠标点击task节点事件
	 *    主要包括：
	 * 1.更新上一个节点信息到数据库
	 * 2.把点击选择到的节点的所有prop信息展示到属性框
	 * 3.给添加的每一个属性样式添加点击事件
	 * @param e
	 */
	clickEventOnNode: function(e) {
		var util = this;
		var helper = this.helper;
		var key = '';
		//先保存上一个节点
		var lastnode = helper.getCurrentNode();
		if(lastnode != null) {
			//todo update node here
			
		}
		if(e != null)
			key = e.currentTarget.id;
		else {
			//对于ie浏览器
		}
		var content = $('#prop_container');
		content.empty();
		helper.setCurrentNode(key);

		var node = helper.container.getNode(key);
		var props = node.prop;
		for(var i = 0; i < props.length; i++) {
			var inputType = props[i].editor;
			var str = this.buildPannel(node, i);
			switch(inputType) {
				case 'select':
					var selectPannel = $(str).appendTo(content);
					var select = selectPannel.find('select');
					select.change(editorMethod[props[i].changeEvent]);
					break;
				case 'popupButton':
					var popupButtonPannel = $(str).appendTo(content);
					var popupButton = popupButtonPannel.find('button');
					popupButton.click(editorMethod[props[i].callback])
					break;
				case 'doubleSelect':
					var selectPannel = $(str).appendTo(content);
					var select = selectPannel.find('select')[0];
					$(select).change(editorMethod[props[i].changeEvent]);
					break;
				default:
					content.append(str);
			}

		}

		$('.panel-collapse').on('show.bs.collapse', function() {
			var id = this.id;
			util.rightDownEvent(id);
		});
		$('.panel-collapse').on('hidden.bs.collapse', function() {
			var id = this.id;
			util.rightDownEvent(id);
		})
		this.stopBubble(e);
	},

	//构建task元素字符串
	buildRect: function(node) {
		var s = '<div id="' + node.id +
			'" class="tasknode">' +
			'<span class="' + node.rect.srcClass +
			'"></span> <strong>' + node.rect.text +
			'</strong>' +
			'<span class="glyphicon glyphicon-chevron-down"></span>' +
			'<p>' + node.rect.note + '</p></div>';
		return s;
	},

	//构建右边属性框元素字符串
	buildPannel: function(node, index) {
		var props = node.prop;
		var id = node.id + index;
		var val = props[index].value;
		var editor = props[index].editor;
		var name = props[index].name;
		var str = null;

		//判断字符是否带有hide字
		if(editor.match('hide'))
			str = this.helper.editor.pannel(true);
		else
			str = this.helper.editor.pannel(false);
		str += this.helper.editor.smallIcon();
		str += this.helper.editor.pannelLabel(props[index].label, id);
		var content = null;
		if(editor == 'select') {
			content = this.helper.editor[editor](props[index]);
		} else {
			content = this.helper.editor[editor](props[index]);
		}
		str += this.helper.editor.pannelBody(id, content);
		str += '</div>';
		return str;
	},

	//绑定右键菜单时间 该方法使用了Jquery的右键菜单依赖 需要导入相关jq库
	bindcontextmenu: function(idValue) {
		var util = this;
		var helper = this.getHelper();
		var id = "#" + idValue;
		var el = $(id);
		$(id).contextPopup({
			//		title: 'My Popup Menu',
			items: [{
				label: '删除本节点',
				action: function() {
					if(confirm("确定删除本节点吗?")) {

						var target = helper.container.getNode(idValue);
						//删除连线操作
						helper.container.nodes.forEach(function(node, index, array) {

							var connections = node.connections;
							for(var i = 0; i < connections.length; i++) {
								if(connections[i].targetId == idValue ||
									connections[i].sourceId == idValue) {
									helper.container.removeConnection(
										connections[i].sourceId,
										connections[i].suuid,
										connections[i].tuuid
									)
								}
							}
						});
						helper.instance.detachAllConnections(el);
						var del = helper.container.getNode(idValue);

						//////////////////////////////////////////////////
						util.delTask(idValue, JSON.stringify(del));
						helper.instance.removeAllEndpoints(idValue);
						$(id).remove();
					}
				}
			}, {
				label: '查看日志',
				action: function() {
					alert('查看日志');
				}
			}, {
				label: '运行到此处',
				action: function() {
					alert('运行到此处');
				}
			}, {
				label: '查看结果',
				action: function() {
					alert('查看结果');
				}
			}, ]
		});
	},
	/**
	 * @author Wang zhiwen
	 * @description 构建弹出框显示元数据表格
	 * @param list
	 * @returns {string}
	 */
	buildMetaTable: function(list) {
		var str = '<table class="table table-striped">' +
			'<caption>选择元数据字段</caption>' +
			'<thead>' +
			'<tr>' +
			'<th>字段名</th>' +
			'<th>别名</th>' +
			'<th>描述</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody>'
		for(var i = 0; i < list.length; i++) {
			var column = '<tr><td>' + list[i].fieldName + '</td>' +
				'<td>' + list[i].fieldCnName + '</td>' +
				'<td>' + list[i].fieldDesc + '</td>' +
				'<td>'
				// +'<div class="btn-group" data-toggle="buttons">'
				+
				'<label class="btn btn-primary">' +
				'<input type="radio" name="' + 'isSelect' + i + '" value="yes" checked="checked"> 已选 </label>' +
				'<label class="btn btn-primary">' +
				'<input type="radio" name="' + 'isSelect' + i + '" value="no"> 未选 </label>'
				// +'</div>'
				+
				'</td>' +
				'</tr>'
			str += column
		}
		str += '</tbody>'
		str += '</table>'
		return str;
	}
};

var editorMethod = {
	defaultInit: function(prop) {
		if(prop != null)
			alert(prop)
		var map = new Map();
		map.set('key1', 'value1');
		map.set('key2', 'value2');
		return map;
	},
	defaultChange: function(event) {
		//Todo change事件看需求写 暂时没想法

		var select = $(this).val()
		alert(select)
	},
	tablemateInit: function(prop) {
		var map = new Map();
		$.ajax({
			type: "POST",
			url: "/metadata/getDataBaseList",
			async: false,
			success: function(msg) {
				if(msg.code == 1) {
					metaDataList = msg.dataBaseList;
					if(metaDataList != null) {
						for(var i = 0; i < metaDataList.length; i++) {
							map.set(metaDataList[i].databaseId, metaDataList[i].databaseName);
						}
					}

				}
			}
		});
		return map;
	},
	tablemateEventChange: function() {
		var selected = $(this).val();
		var prop_id = this.id.substring(0, 16);
		var collapse = $('#' + this.id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node = Util.helper.container.getNode(node_id);
		var prop = Util.helper.container.getPropByID(prop_id, node);
		var secendSelect = $('#' + prop_id + 'ds2')[0];
		//todo ajax for here
	},
	buttonPopup: function(event, prop) {
		//Todo 弹出框实现方法 目前弹出框没内容

		//获取node对象
		var index = null;
		var button = event.delegateTarget;
		var prop_id = button.id;
		var prop_value = button.value;
		var collapse = $('#' + prop_id).closest('.panel-collapse')[0];
		var node_id = collapse.id.substring(0, 16);
		var node = Util.helper.container.getNode(node_id);

		var tableParams = $('#table-params');
		//移除hide class用于layer显示
		tableParams.removeClass("hide");
		var metaDataList = null;
		//todo ajax for here

		var lt = layer.open({
			type: 1,
			title: '****',
			fix: true,
			scrollbar: true,
			area: ['85%', '90%'], //宽高
			content: $('#table-params'), //project.jsp中的一个隐藏div
			btn: ['保存', '取消'],
			yes: function(index, layero) {
				var trs = $($(tableParams[0]).find('table')[0]).find('tr');
				var prop = Util.helper.container.getPropByID(prop_id, node);
				var value_str = '';
				for(var i = 0; i < trs.length; i++) {
					var tds = $(trs[i]).find('td');
					if(tds.length != 0) {
						//减1的原因是因为表头不处理 故减1
						var radio = $(tds[3]).find('input:radio[name="isSelect' + (i - 1) + '"]:checked')[0].value;
						if(radio == 'yes') {
							for(var j = 0; j < tds.length - 1; j++) {
								//Todo 针对表元信息 由于表源信息缺少类型字段 下面为样式代码
								var td_value = tds[j].innerHTML;
								if(td_value != null || td_value != '') {
									value_str += td_value;
									value_str += ",";
								}
								value_str += ';'
							}
						}

					}

				}
				prop.value = value_str;
			},
			btn2: function(index, layero) {}
		});
	}
}