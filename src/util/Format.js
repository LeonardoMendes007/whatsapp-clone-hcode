class Format{

    static getCamelCase(element)
    {
        let div = document.createElement('div');
        
        div.innerHTML = `<div data-${element}="id"></div>`;

        return Object.keys(div.firstChild.dataset)[0];
    }

}