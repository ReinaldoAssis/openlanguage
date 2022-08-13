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
    <div className={styles.sectwoaux}>
      <Grid.Container
        gap={3}
        justify="center"
        css={{ height: "100%", overflow: "visible" }}
      >
        <ToolCard
          iconRef="home/cards.svg"
          title="Flashcards"
          description="Create your deck of words and expressions."
        />
        <ToolCard
          description="A perfect place to develop your writing skills in your target language."
          title="Writing Studio"
          iconRef="/home/writing.svg"
        />
        <ToolCard
          iconRef="/home/comment.svg"
          description="Help and be helped by the community!"
          title="Community"
        />
        {/* <ToolCard /> */}
      </Grid.Container>
    </div>
  </div>
);

const ToolCard = ({
  description,
  iconRef,
  title,
}: {
  description?: string;
  iconRef?: string;
  title?: string;
}) => (
  <Grid xs={8} md={4} sm={4} css={{ overflow: "visible" }}>
    <Card isHoverable css={{ overflow: "visible" }}>
      <Card.Header>
        <img height={34} width={34} src={iconRef} />
        <h3 style={{ marginLeft: 10 }}>{title}</h3>
      </Card.Header>
      <Card.Body css={{ paddingTop: 0 }}>
        <h5>{description}</h5>
      </Card.Body>
    </Card>
  </Grid>
);
