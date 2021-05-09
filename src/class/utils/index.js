// Removes any Html tags from string
function stripHtml(s) {
  if (!s || typeof s !== 'string')
    return '';

  return s.replace(/<[^>]+>/g, '');
}

export {
  stripHtml
}