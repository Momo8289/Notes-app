const escapeHtml = (unsafe) => {
    return unsafe.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}


const applyMarkup = (text) => {
    let converter = new showdown.Converter()
    return converter.makeHtml(text)
    
    // const markupReplacer = (toStrip, replace, text) => {
    //     return text.replace(toStrip, replace[0]).replace(toStrip, replace[1])
    // }
    // let out = text
    // for(const p in regexes) {
    //     out = out.replaceAll(regexes[p].pattern, (match, _, offset) => {
    //         // console.log("m", match)
    //         // if(out[offset-1] == "\\" || out[((offset+match.length)-1)-regexes[p].toStrip.length] == "\\") {
    //         //     return match.replaceAll("\\", "")
    //         // }
    //         return markupReplacer(regexes[p].toStrip, regexes[p].replace, match)
    //     })
    // }
    // return out
}

const processText = (text) => {
    let t = applyMarkup(escapeHtml(text)).replaceAll("\n", "<br>")
    // t = t.slice(3, t.length - 4)
    return t
}

// https://stackoverflow.com/a/2117523/11331465
function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const setFavButtonState = (state, id=null) => {
    if(!state) {
        $(`#${id?id+"-":""}activeStarIcon`).hide()
        $(`#${id?id+"-":""}starIcon`).show()
    }
    else {
        $(`#${id?id+"-":""}activeStarIcon`).show()
        $(`#${id?id+"-":""}starIcon`).hide()
    }
}