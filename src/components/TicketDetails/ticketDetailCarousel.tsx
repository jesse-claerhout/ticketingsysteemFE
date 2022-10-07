import { Card } from "@mui/material";
import Carousel from "../PhotoSlideshow/carousel";

type TicketDetailCarouselProps = {
  imageURLs: string[];
};

function TicketDetailCarousel({ imageURLs }: TicketDetailCarouselProps) {

const HasImages = () => {
  return imageURLs.length !== 0;
}

  return (
    <div>
    {HasImages() ? (
    <Card
      variant="outlined"
      sx={{ mt: { xs: 2, md: 0 }, mx: {xs: 1, md: 4}, boxShadow: "0 2px 6px #d0efef" }}
    >
      <Carousel imageURLs={imageURLs} />
    </Card>
    ) : <></>}
    </div>
  );
}

export default TicketDetailCarousel;
