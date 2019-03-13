function handlePDF(title) {
    var div = "<html><head><style> .hideforpdf{display: none;}td{text-align:center;}table{border: 1px solid black;float: center;}table tr{border: 1px solid black;}table tr td{border: 1px solid black;}table tr th{border: 1px solid black;}</style></head><body>";
    div += document.getElementById('printArea').innerHTML;
    div += "</body></html>";
    var win = window.open("", "", "width=960,height=500");
    win.document.write("<center><img src='http://getd2.com/img/logo-new.png'/><h1>{title}</h1></center><br><br>");
    win.document.write(div);
    win.document.write("<br><br><center><p>&copy All Rights Reserved By D2</p><p>Developed By D2</p></center>");
    win.print();
}