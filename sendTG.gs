function sendTG (obj) {
  const objParam = data => Object.entries(data).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')
  const { botToken, chatID, imageUrl, type, content } = obj
  const params = {}
  params.chat_id = chatID
  if (imageUrl) {
    params.photo = imageUrl
    params.caption = content
  } else {
    params.text = content
  }

  if (type === 'markdown') {
    params.parse_mode = 'MarkdownV2'
  } else if (type === 'html') {
    params.parse_mode = 'html'
  }
  
  const text =  UrlFetchApp.fetch(`https://api.telegram.org/bot${botToken}/${imageUrl ? 'sendPhoto' : 'sendMessage'}?${objParam(params)}`).getContentText()
  const json = JSON.parse(text)
  return json
}
