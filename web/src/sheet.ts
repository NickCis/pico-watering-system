const sheet = new CSSStyleSheet();
sheet.replace(document.getElementsByTagName('style')[0].innerHTML);

export { sheet };
