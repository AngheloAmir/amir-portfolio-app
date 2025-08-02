export interface CarouselInterface {
    slides  :Array<{
        image   :string;
        title   :string;
        text    :string;
        tags?   :string[];
    }>
}
