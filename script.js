function generateCode(){
    const templateGetter = "public #TYPE# get#CAPITALIZED_NAME#() {\n\treturn this.#NAME#;\n}";
    const templateSetter = "public void set#CAPITALIZED_NAME#(#TYPE# #NAME#) {\n\tthis.#NAME# = #NAME#;\n}";
    const commentTemplate = "/* Atributo #NAME# */"

    var input = document.getElementById('atributos').value;
    var atributos = input.split(';')

    var outputEl = document.getElementById('output');
    outputEl.innerText = '';

    atributos.forEach(function(el){
        if(!el)
            return;

        var attr = el.match(/private (.*)/)[1];
        var split = attr.split(' ');

        var attrType = split[0];
        var attrName = split[1];
        var capitalizedAttrName = split[1].capitalize();

        var getter = templateGetter.replace('#TYPE#', attrType).replace('#CAPITALIZED_NAME#', capitalizedAttrName).replace('#NAME#', attrName);
        var setter = templateSetter.replace('#TYPE#', attrType).replace('#CAPITALIZED_NAME#', capitalizedAttrName).replaceAll('#NAME#', attrName)

        outputEl.innerText += getter + "\n\n";
        outputEl.innerText += setter + "\n\n";

    });
}

window.onload = function () {

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    document.getElementById('bt-generate-code').addEventListener('click', generateCode);
}
