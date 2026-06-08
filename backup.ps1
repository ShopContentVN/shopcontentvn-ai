$ErrorActionPreference = "Stop"

$appDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backupPath = Join-Path $appDir "backup.md"
$files = @(
  "index.html",
  "styles.css",
  "app.js",
  "server.py",
  "README.md",
  "render.yaml",
  "requirements.txt"
)

function Get-Language($fileName) {
  switch ([IO.Path]::GetExtension($fileName)) {
    ".html" { "html" }
    ".css" { "css" }
    ".js" { "javascript" }
    ".py" { "python" }
    ".md" { "markdown" }
    ".yaml" { "yaml" }
    ".yml" { "yaml" }
    ".txt" { "text" }
    default { "text" }
  }
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# ShopContentVN AI - Auto Backup")
$lines.Add("")
$lines.Add("Last updated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')")
$lines.Add("")
$lines.Add("## Project")
$lines.Add("")
$lines.Add("MVP app for Vietnamese sellers. Input product details, then generate caption, Shopee description, video hooks, and livestream script.")
$lines.Add("")
$lines.Add("Local URL:")
$lines.Add("")
$lines.Add('```text')
$lines.Add("http://127.0.0.1:5506/")
$lines.Add('```')
$lines.Add("")
$lines.Add("Run:")
$lines.Add("")
$lines.Add('```powershell')
$lines.Add("python server.py")
$lines.Add('```')
$lines.Add("")
$lines.Add("Run with OpenAI key:")
$lines.Add("")
$lines.Add('```powershell')
$lines.Add('$env:OPENAI_API_KEY="sk-..."')
$lines.Add("python server.py")
$lines.Add('```')
$lines.Add("")
$lines.Add("## Source Snapshot")
$lines.Add("")

foreach ($file in $files) {
  $path = Join-Path $appDir $file
  if (-not (Test-Path $path)) {
    continue
  }

  $language = Get-Language $file
  $lines.Add("### $file")
  $lines.Add("")
  $lines.Add('```' + $language)
  $content = Get-Content -LiteralPath $path -Raw -Encoding UTF8
  $lines.Add($content.TrimEnd())
  $lines.Add('```')
  $lines.Add("")
}

Set-Content -LiteralPath $backupPath -Value $lines -Encoding UTF8
Write-Host "Updated $backupPath"
