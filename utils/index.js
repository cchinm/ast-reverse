const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
const path = require('path');
const fs = require('fs')

let encode_js = "source.js"
let decode_js = "decode_source.js"
let _path = "./"
var jscode;
// console.log("命令行参数 process.argv", process.argv)

if (process.argv[2] !== undefined) {
    var tmp = process.argv[2].split("/")
    if (tmp.length === 1) {
        encode_js = tmp[0]
    } else {
        _path = tmp.slice(0, tmp.length - 1).join("/") + "/"
        encode_js = tmp[tmp.length - 1]
    }
}

if (process.argv[3] === undefined) {
    decode_js = "decode_from_" + encode_js;
    decode_js = _path + decode_js
} else {
    decode_js = process.argv[3]
}
encode_js = _path + encode_js


console.log("读取待解析文件路径: ", encode_js)
console.log("待保存文件路径: ", decode_js)


try {
    jscode = fs.readFileSync(encode_js, {
        encoding: "utf-8"
    });
} catch (e) {
    console.log("读取文件过程发生错误: ", e)
    process.exit(1)
}
// console.log(jscode)

let ast = parser.parse(jscode);
// 编写遍历节点代码




traverse(
    ast, {
        // write your code

    }
)
// console.log(ast)

let {
    code
} = generator(ast, opts = {
    jsescOption: {
        "minimal": true
    }
});

fs.writeFile(decode_js, code, {
    encoding: "utf-8"
}, (err) => {}, );