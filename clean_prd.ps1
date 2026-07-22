$text = Get-Content 'assets/prd_extracted.txt' -Raw
$text = $text -replace 'â€"', '—'
$text = $text -replace 'â€œ', '"'
$text = $text -replace 'â€', '"'
$text = $text -replace 'â€˜', "'"
$text = $text -replace 'â€™', "'"
$text = $text -replace 'â€¢', '•'
Set-Content 'assets/prd_clean.txt' -Value $text -Encoding utf8