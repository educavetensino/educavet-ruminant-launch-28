import { Helmet } from "react-helmet-async";

interface HeadSectionProps {
  title: string;
  description: string;
  canonical?: string;
}

const HeadSection = ({ title, description, canonical }: HeadSectionProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical || window.location.href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default HeadSection;
