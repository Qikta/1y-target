
export const generateOgpPath = () => {
  const path = 'xxxxxxxx-xxxxxxxx-'.split('')
  for (let i = 0, len = path.length; i < len; i++) {
    switch (path[i]) {
      case 'x':
        path[i] = Math.floor(Math.random() * 16).toString(16)
        break
    }
  }
  const saveDate = new Date();
  const formatpath = path.join('') + String(saveDate.getTime())

  return formatpath
}