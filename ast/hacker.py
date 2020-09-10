import mitmproxy.http
from mitmproxy import ctx

def response(flow: mitmproxy.http.HTTPFlow):

    if flow.request.url.find("https://static.geetest.com/static/js/slide.7.7.4.js") > -1:
        ctx.log("replace slide.7.7.4.js")
        with open("./statics/bin/ddd_mogujie_geetest.js", "r", encoding="utf8") as fp:
            js = fp.read()
        flow.response.set_text(js)