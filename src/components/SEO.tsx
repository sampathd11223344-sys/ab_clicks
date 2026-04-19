import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

export default function SEO({ 
  title, 
  description = "AB Clicks - Professional Photography and Cinematography services in India. Capturing your special moments with excellence.", 
  keywords = "photography, wedding photography, cinematography, event coverage, baby photo shoot, pre-wedding shoot, AB Clicks", 
  image = "/og-image.jpg", 
  url = "https://abclicks.in",
  type = "website",
  noindex = false
}: SEOProps) {
  const siteTitle = "AB Clicks | Photography & Cinematography";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Facebook Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
