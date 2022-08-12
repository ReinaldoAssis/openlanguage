import { Card, Col, Grid, Text } from "@nextui-org/react";
import Learning from "../../public/studying.png";

export const SectionOne = () => (
  <>
    <Text
      h1
      css={{
        textGradient: "45deg, #3b3b3b -20%, #000000 50%",
        alignSelf: "start",
      }}
    >
      Our Goal
    </Text>

    <ul></ul>

    <Grid.Container gap={1} justify="center" css={{ height: "100%" }}>
      <Grid xs={12} sm={4} css={{ minWidth: 300, maxHeight: 400 }}>
        <img src="/hard.svg" />
      </Grid>
      <Grid xs={12} sm={4} css={{ textAlign: "start" }}>
        <Text
          h3
          css={{
            marginTop: 90,
            textAlign: "justify",
            alignSelf: "start",
          }}
        >
          &emsp;Language learning doesn't need to be boring and expensive! We
          want to provide tools to better aid the community of language
          learners.
        </Text>
      </Grid>
    </Grid.Container>
  </>
);
