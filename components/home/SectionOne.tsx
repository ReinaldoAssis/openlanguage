import { Card, Col, Grid, Text } from "@nextui-org/react";
import Image from "next/image";

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

    <Grid.Container gap={1} justify="center" css={{ height: "100%" }}>
      <Grid xs={12} sm={4} css={{ minWidth: 300, maxHeight: 400 }}>
        <Image
          style={{ minWidth: "100%", minHeight: "100%" }}
          src="/home/hard.svg"
        />
      </Grid>
      <Grid
        xs={12}
        sm={4}
        css={{
          textAlign: "start",
          "@xs": { minHeight: 300, height: "fit-content" },
        }}
      >
        <Text
          h3
          css={{
            textAlign: "justify",
            alignSelf: "start",
            "@md": { marginTop: 90 },
            "@lg": { marginTop: 90 },
            "@sm": { marginTop: 90 },
          }}
        >
          &emsp;Language learning doesn&apos;t need to be boring and expensive!
          We want to provide tools to better aid the community of language
          learners.
        </Text>
      </Grid>
    </Grid.Container>
  </>
);
