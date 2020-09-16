import numpy as np
from PIL import Image


SEQUENCE = [39,38,48,49,41,40,46,47,35,34,50,51,33,32,28,29,27,26,36,37,31,30,44,45,43,42,12,13,23,22,14,15,21,20,8,9,25,24,6,7,3,2,0,1,11,10,4,5,19,18,16,17]

def ReCut():

    """
    for (var a = r / 2, _ = 0; _ < 52; _ += 1) {
              var u = SEQUENCE[_] % 26 * 12 + 1,
                  c = 25 < SEQUENCE[_] ? a : 0,
                  l = i["getImageData"](u, c, 10, a);
              s["putImageData"](l, _ % 26 * 10, 25 < _ ? a : 0);
            }
    """
    r = 160
    a = r // 2
    i = 0
    paste_list = []
    while i < 52 :
        u = SEQUENCE[i] % 26 * 12 + 1
        c = a if 25 < SEQUENCE[i] else 0
        l = [u, c, 10, a]
        target = [i % 26 * 10, a if 25 < i else 0]
        print(l, target)
        i = i + 1 
        paste_list.append((l, target))
    return paste_list


def MergeImage():
    paste_list = ReCut()
    img = Image.open("./mogujie/1ce447791.webp")
    new_image = Image.new('RGB',(260,160))

    for source, target in paste_list:
        x, y, w, h = source
        offset_x, offset_y = target
        _img = img.crop((x, y, x+w, y+h))
        new_image.paste(_img, (offset_x, offset_y))
    new_image.save("test1.png")
