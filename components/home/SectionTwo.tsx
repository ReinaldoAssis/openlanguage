import { Card, Grid, Text } from "@nextui-org/react";
import styles from "../../styles/Home.module.css";

export const SectionTwo = () => (
  <div className={styles.sectwo}>
    <Text
      h1
      css={{
        textGradient: "45deg, #3b3b3b -20%, #000000 50%",
        alignSelf: "start",
      }}
    >
      Toolkit
    </Text>
    <Grid.Container gap={1} justify="center" css={{ height: "100%" }}>
      <ToolCard />
      <ToolCard />
      <ToolCard />
      <ToolCard />
    </Grid.Container>
  </div>
);

const ToolCard = () => (
  <Grid xs={8} md={4} sm={4}>
    <Card isHoverable>
      <Card.Header>
        <img height={34} width={34} src="/cards.svg " />
        <h3 style={{ marginLeft: 10 }}>Random phrases</h3>
      </Card.Header>
      <Card.Body>
        <h5>Hi mom hi dad</h5>
      </Card.Body>
    </Card>
  </Grid>
);
