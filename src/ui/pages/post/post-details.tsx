import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import PostAuthor from "../../components/blog/post-author";
import NextImage from "next/image";

const PostDetails = ({ post }: any) => {
  const getContentFragment = (idx: any, text: any, obj: any, type?: any) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold)
        modifiedText = (
          <Text key={idx} fontWeight={"bold"}>
            {modifiedText}
          </Text>
        );
      if (obj.italic)
        modifiedText = (
          <Text key={idx} fontStyle={"italic"}>
            {modifiedText}
          </Text>
        );
      if (obj.underline)
        modifiedText = (
          <Text key={idx} textDecoration={"underline"}>
            {modifiedText}
          </Text>
        );
    }

    switch (type) {
      case "heading-three":
        return (
          <Heading color={"white"} as={"h3"} fontSize={"3xl"} key={idx}>
            {modifiedText}
          </Heading>
        );
      case "heading-four":
        return (
          <Heading color={"white"} as={"h4"} fontSize={"2xl"} key={idx}>
            {modifiedText}
          </Heading>
        );
      case "paragraph":
        return (
          <Text
            key={idx}
            fontSize={"lg"}
            letterSpacing={"wide"}
            fontWeight={"medium"}
            color={"gray.100"}
            my={4}
          >
            {modifiedText}
          </Text>
        );
      case "image":
        return <Image key={idx} src={obj.url} alt={obj.alt} />;
      default:
        return modifiedText;
    }
  };

  return (
    <Container
      maxW="container.lg"
      bg={"gray.800"}
      borderRadius={"md"}
      zIndex={1}
      px={[0, 4]}
    >
      <VStack maxW={"container.md"} mx={"auto"} py={10}>
        <VStack w={"full"} px={4}>
          {/* Image */}
          <Box
            w="100%"
            h="100%"
            maxW={"container.sm"}
            borderWidth={"3px"}
            borderColor={"purple.900"}
            borderRadius={"md"}
          >
            <AspectRatio maxW={"full"} ratio={16 / 9}>
              <NextImage
                src={post.featuredImage.url}
                alt={"featured image"}
                fill
              />
            </AspectRatio>
          </Box>
          {/* Author */}
          <Box justifyContent={"left"} w={"full"}>
            <PostAuthor author={post.author} post={post} />
          </Box>
        </VStack>
        <Divider borderColor={"gray.500"} />
        <Box bg={"blackAlpha.500"} w={"full"} borderRadius={"md"} p={4}>
          {/* Title */}
          <Heading color={"blue.300"} textAlign={"center"} my={5}>
            {post.title}
          </Heading>
          {/* Content */}
          <Box maxW={"container.md"} px={4}>
            {post.content.raw.children.map((typeObj: any, itemIdx: any) => {
              const children = typeObj.children.map(
                (item: any, itemIdx: any) => {
                  return getContentFragment(itemIdx, item.text, item);
                }
              );
              return getContentFragment(
                itemIdx,
                children,
                typeObj,
                typeObj.type
              );
            })}
          </Box>
        </Box>
      </VStack>
    </Container>
  );
};

export default PostDetails;
