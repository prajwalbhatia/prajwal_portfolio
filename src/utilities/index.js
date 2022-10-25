export const socialMediaClick = (socialMedia) => {
  switch (socialMedia) {
    case 'linkedin':
      openInNewTab('https://www.linkedin.com/in/prajwalbhatia/');
      break;
    case 'github':
      openInNewTab('https://github.com/prajwalbhatia/');
      break;
    case 'instagram':
      openInNewTab('https://www.instagram.com/prajwal_bhatia/');
      break;  
    case 'twitter':
      openInNewTab('https://twitter.com/bhatia_prajwal');
      break;
    case 'blogs':
      openInNewTab('https://prajwalbhatia.hashnode.dev/');
    case 'habstreak':
      openInNewTab('https://habstreak.com');
    case 'habstreak-app':
      openInNewTab('https://play.google.com/store/apps/details?id=com.Habstreak');         
    default:
      break;
  }
}

export const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}