$xml = [xml](Get-Content 'assets/temp_docx2/word/document.xml' -Raw)
$ns = @{ w = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main' }
$texts = Select-Xml -Xml $xml -XPath '//w:t' -Namespace $ns | ForEach-Object { $_.Node.InnerText }
$texts -join ' ' | Set-Content 'assets/prd_extracted.txt' -Encoding utf8