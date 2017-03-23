/**
 * Created by Wang zhiwen on 2017/1/18.
 */
function Editor() {
    this.pannel = function (isHide) {
        var str = ' <div class="panel'
        if (isHide)
            str += ' hide'
        str += '">';
        return str;
    };
    this.smallIcon = function () {
        var str = ' <span class="glyphicon glyphicon-chevron-right" style="float: left;margin-right:10px;"></span>';
        return str;
    };

   //折叠连接
    this.pannelLabel = function (label, id) {
        var str = '<h4 class="panel-title">'
            + '<a data-toggle="collapse" data-parent="#accordion" style="display: block;"'
            + 'href="#' + id + '">' + label
            + '   </a>'
            + ' </h4>';
        return str;

    };

    //给属性列表的节点添加标签 并把节点的id赋值到此 id的值为节点id+index
    this.pannelBody = function (id, content) {
        var str = '<div id="' + id + '" class="panel-collapse collapse">'
            + '<div class="panel-body">'
            + content
            + '</div>'
            + '</div>';
        return str;
    };

    this.select = function (prop) {
        //Todo 对于选择框实现 考虑把所有数据都保存到prop.value字段中 通过解析该字段展示不同的内容
        //暂时没实现字段的解析
        var val = prop.value;
        var name= prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var otherValue = prop.otherValue;
        var data = editorMethod[prop.initEvent]();
        var str = '<div class="editor"> ' +
            '<select name="' + name + '"id="'+id+'" style="width : 100%" ';
        if (val != null) {
            str += 'value="'
            str += val;
            str += '" ';
        }
        str+='editor="'+editor+'">';
        data.forEach(function (value,key,map) {
            str+=('<option value="'+key+'">'+data.get(key)+'</option>');
        })
        str+='</select > </div>'
        return str;
    }
    this.doubleSelect = function (prop) {
        //Todo 对于选择框实现 考虑把所有数据都保存到prop.value字段中 通过解析该字段展示不同的内容
        //暂时没实现字段的解析
        var val = prop.value;
        var name= prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var data = editorMethod[prop.initEvent]();
        var str = '<div class="editor"> ' +
            '<select name="' + name + '"id="'+id+'ds1'+'" style="width : 100%" ';
        str+='editor="'+editor+'">';
        data.forEach(function (value,key,map) {
            str+=('<option value="'+key+'">'+data.get(key)+'</option>');
        })
        str+='</select > </div>'
        var dsstr ='<div class="editor"> ' +
            '<select name="' + name + '"id="'+id+'ds2'+'" style="width : 100%" ';
        dsstr+='editor="'+editor+'">';
        if (val != null) {
                    var kv = val.split(";");
                    if(kv.length==2) {
                        var option ='<option value="'+kv[0]+'">'+kv[1]+'</option>';
                        dsstr +=option;
            }
        }
        dsstr+='</select > </div>'
        return str+'<span></span>'+dsstr;
    }

    this.input = function (prop) {
        var val = prop.value;
        var editor = prop.editor;
        var name = prop.name;
        var id = prop.id;
        var str = '<div class="editor">'
            + '<input type="text" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:100%;" ';
        if (val != null || val != '') {
            str += 'value="'
            str += val;
            str += '" ';
        }
        str += '>'
        str += ' </div>';
        return str;
    };
    this.hideInput = function (prop) {
        var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var str = '<div class="editor">'
            + '<input type="text" class="form-control hide" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:100%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
        str += ' </div>';
        return str;
    }

    this.popupButton = function(prop) {
        var val = prop.value;
        var name = prop.name;
        var editor = prop.editor;
        var id = prop.id;
        var str = '<div class="editor">'
            + '<button type="button" class="form-control" id="'+id+'" editor="' + editor + '"';
        if (name != null || name != '') {
            str += 'name ="'
            str += name;
            str += '" '
        }
        str += 'style="width:90%;"';
        if (val != null || val != '') {
            str += ' value="'
            str += val;
            str += '" ';
        }
        str += '>'
        str += ' 点击编辑</button> </div>';
        return str;
    }
    this.hideConstInput = function (prop) {
        return this.hideInput(prop);
    }
    this.hideConstOutput = function (prop) {
        return this.hideInput(prop);
    }

}
