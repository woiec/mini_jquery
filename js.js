
/**
 * JS常用方法封装
 * @方淞 2019-1-21 V1.0.0 BETA
 * @URL https://www.woiec.com
 */

(function(window, undefined) {

    'use strict';

    var document = window.document;

    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };

    jQuery.fn = jQuery.prototype = {

        init: function (selector, context) {
            this.ele = [];
            if (typeof selector === 'string') {
                var char = selector.substr(0, 1);
                if (char === '#') {
                    this.ele[0] = document.getElementById(selector.substr(1));
                } else if (char === '.') {
                    var eles = document.getElementsByClassName(selector.substr(1));
                    for (var i = 0; i < eles.length; i++) {
                        this.ele[i] = eles[i];
                    }
                } else {
                    var eles = document.getElementsByTagName(selector);
                    for (var i = 0; i < eles.length; i++) {
                        this.ele[i] = eles[i];
                    }
                }
            } else if ($.isFunction(selector)) {
                window.onload = selector;
            }  else if (typeof selector === 'object') {
                if (selector.nodeType) {
                    this.ele[0] = selector;
                }
            }
            return this;
        }

    };

    jQuery.extend = jQuery.fn.extend = function (e) {
        var options, name, src, copy,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length;
        if (typeof target === 'boolean') {
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== 'object' && !this.isFunction(target)) {
            target = {};
        }
        if (i === length) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];
                    if (target === copy) {
                        continue;
                    }
                    if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }
        return target;
    };

    /**
     * $.functionName() 调用
     */
    jQuery.extend({

        /**
         * isFunction
         * @param obj
         * @returns {boolean}
         */
        isFunction: function (obj) {
            return typeof obj === 'function' && typeof obj.nodeType !== 'number';
        },

        /**
         * toType
         * @param obj
         * @returns {*}
         */
        toType: function (obj) {
            if (obj == null) {
                return obj + '';
            }
            var class2type = {};
            var to_string = class2type.toString;
            var type_list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error', 'Symbol'];
            for (var i = 0; i < type_list.length; i++) {
                class2type[ '[object ' + type_list[i] + ']' ] = type_list[i].toLowerCase();
            }
            return typeof obj === 'object' || typeof obj === 'function' ?
                class2type[to_string.call(obj)] || 'object' : typeof obj;
        },

        /**
         * isWindow
         * @param obj
         * @returns {boolean}
         */
        isWindow: function (obj) {
            return obj != null && obj === obj.window;
        },

        /**
         * isArrayLike
         * @param obj
         * @returns {boolean}
         */
        isArrayLike: function (obj) {
            var length = !!obj && 'length' in obj && obj.length,
                type = this.toType(obj);
            if (this.isFunction(obj) || this.isWindow(obj)) {
                return false;
            }
            return type === 'array' || length === 0 ||
                typeof length === 'number' && length > 0 && (length - 1) in obj;
        },

        /**
         * each
         * @param obj
         * @param callback
         * @returns {*}
         */
        each: function (obj, callback) {
            var length, i = 0;
            if (this.isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }
            return obj;
        },

        /**
         * 对象是否为空
         * @param obj
         * @returns {boolean}
         */
        isEmptyObject: function (obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        }

    });

    /**
     * 常用的方法
     */
    jQuery.fn.extend({

        each: function(callback) {
            $.each(this.ele, callback);
            return this;
        }

    });

    /**
     * DOM操作
     */
    jQuery.fn.extend({

        /**
         * html html操作
         * @param value
         */
        html: function (value) {
            if (value === undefined) {
                return this.ele[0].innerHTML;
            }
            for (var i = 0; i < this.ele.length; i++) {
                this.ele[i].innerHTML = value;
            }
            return this;
        },

        /**
         * text 纯文本操作
         */
        text: function (value) {
            if (value === undefined) {
                return this.ele[0].innerText;
            }
            for (var i = 0; i < this.ele.length; i++) {
                this.ele[i].innerText = value;
            }
            return this;
        },

        /**
         * val 文本框操作
         */
        val: function (val) {
            if (val === undefined) {
                return this.ele[0].value;
            }
            for (var i = 0; i < this.ele.length; i++) {
                this.ele[i].value = val;
            }
            return this;
        },

        /**
         * attr 添加attr
         */
        attr: function (name, value) {
            if (name === undefined && value === undefined) {
                return this;
            } else if (name !== undefined && value === undefined) {
                return this.ele[0].getAttribute(name);
            } else if (name !== undefined && value !== undefined) {
                for (var i = 0; i < this.ele.length; i++) {
                    this.ele[i].setAttribute(name, value);
                }
            }
            return this;
        },

        /**
         * removeAttr 移除attr
         */
        removeAttr: function (name) {
            if (name !== undefined) {
                for (var i = 0; i < this.ele.length; i++) {
                    this.ele[i].removeAttribute(name);
                }
            }
            return this;
        },

        /**
         * addClass 添加class
         */
        addClass: function (name) {
            if (name !== undefined) {
                for (var i = 0; i < this.ele.length; i++) {
                    this.ele[i].classList.add(name);
                }
            }
            return this;
        },

        /**
         * removeClass 移除class
         */
        removeClass: function (name) {
            if (name !== undefined) {
                for (var i = 0; i < this.ele.length; i++) {
                    this.ele[i].classList.remove(name);
                }
            }
            return this;
        },

        /**
         * empty 删除匹配的元素集合中所有的子节点，不包括本身
         */
        empty: function () {
            for (var i = 0; i < this.ele.length; i++) {
                var childs = this.ele[i].childNodes;
                for (var j = childs.length - 1; j >= 0; j--) {
                    this.ele[i].removeChild(childs[j]);
                }
            }
            return this;
        },

        /**
         * remove 删除所有匹配的元素,包括本身
         */
        remove: function () {
            for (var i = 0; i < this.ele.length; i++) {
                this.ele[i].parentNode.removeChild(this.ele[i]);
            }
            return this;
        }

    });

    /**
     * 事件
     */
    jQuery.fn.extend({

        on: function (type, callback) {
            return this.each(function () {
                this.addEventListener(type, callback);
            });
        }

    });

    var event_types = ['click', 'dblclivk', 'keydown', 'keyup', 'mousedown', 'mouseup',
        'mouseout', 'mouseenter', 'mouseleave', 'load'];
    for (var i = 0; i < event_types.length; i++) {
        var event_type = event_types[i];
        jQuery.fn[event_type] = (function () {
            var type = event_type;
            return function (callback) {
                return this.on(type, callback);
            }
        })()
    }

    jQuery.fn.init.prototype = jQuery.fn;

    window.$ = jQuery;

})(window);

/**
 * 说明：该JS还在内测，以下未做处理。
 *  1、各浏览器之间的兼容性
 *  2、是否存在内存泄漏
 */
