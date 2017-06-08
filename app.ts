walk(document.body);

function walk(node: Node): void {
    let child, next: Node | null;

    switch (node.nodeType) {
        case 1:  // element
        case 9:  // document
        case 11: // document fragment
            child = node.firstChild;

            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }

            break;

        case 3: // text node
            if (node.parentElement && node.parentElement.tagName.toLowerCase() !== 'script')
                handleText(node);

            break;
    }
}

function handleText(textNode: Node): void {
    let v = textNode.nodeValue;

    if (v === null)
        return;

    // Deal with the easy case
    v = v.replace(/\b(T|t)he (C|c)loud/g, function (match, p1: string, p2: string, offset: number, input: string) {
        const m = String.fromCharCode(p1.charCodeAt(0) - 7);  // t - 7
        const b = String.fromCharCode(p2.charCodeAt(0) - 1);  // c - 1
        return m + 'y ' + b + 'utt';
    });

    // Deal with private clouds
    v = v.replace(/\b(P|p)rivate (C|c)loud/g, function (match, p1, p2, offset, input) {
        const b = String.fromCharCode(p2.charCodeAt(0) - 1);  // c - 1
        return b + 'utt';
    });

    // Get the corner cases
    if (v.match(/cloud/i)) {
        // If we're not talking about weather
        if (v.match(/PaaS|SaaS|IaaS|computing|data|storage|cluster|distributed|server|hosting|provider|grid|enterprise|provision|apps|hardware|software|/i)) {
            v = v.replace(/(C|c)loud/gi, function (match, p1, offset, input) {
                const b = String.fromCharCode(p1.charCodeAt(0) - 1);  // c - 1
                return b + 'utt';
            });
        }
    }

    textNode.nodeValue = v;
}


