function incarcaPersoane() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = this.responseXML;
      var table = "<div class='flex-container' ><div><h1 class='Title'>Persoane</h1><table style='width: 80%; margin: 0 auto ; text-align: center;'><tr><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Strada</th><th>Numar</th><th>Localitate</th><th>Judet</th><th>Tara</th><th>Liceu</th></tr>";
      var persoane = xmlDoc.getElementsByTagName("persoana");
      for (var i = 0; i < persoane.length; i++) {
        var nume = persoane[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue;
        var prenume = persoane[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue;
        var varsta = persoane[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue;
        var strada = persoane[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue;
        var numar = persoane[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue;
        var localitate = persoane[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue;
        var judet = persoane[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue;
        var tara = persoane[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue;
        var liceu = persoane[i].getElementsByTagName("liceu")[0].childNodes[0].nodeValue;
        table += "<tr><td>" + nume + "</td><td>" + prenume + "</td><td>" + varsta + "</td><td>" + strada + "</td><td>" + numar + "</td><td>" + localitate + "</td><td>" + judet + "</td><td>" + tara + "</td><td>" + liceu + "</td></tr>";
      }
      table += "</table></div></div>";
      document.getElementById("continut").innerHTML = table;
    }
  };
  xhttp.open("GET", "persoane.xml", true);
  xhttp.send();
}
