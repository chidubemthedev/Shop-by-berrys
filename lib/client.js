import  SanityClient  from "@sanity/client";
// import { ImageUrlBuilder } from "next-sanity-image";
import imageUrlBuilder  from "@sanity/image-url";

export const client = SanityClient({
    projectId: "yncjo0om",
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-01-08",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN // or leave blank for unauthenticated usage
})

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
}