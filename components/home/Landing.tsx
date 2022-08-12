import { Button, Text } from "@nextui-org/react";
import styles from "../../styles/Home.module.css";

export const Landing = () => (
  <>
    <main className={styles.main} style={{ width: "100vw" }}>
      <h1 className={styles.title}>
        <a>OpenLanguage</a>
      </h1>
      <div className={styles.landingdiv}>
        <Text h2 size={30} style={{ marginRight: 10 }} css={{ color: "white" }}>
          Language acquisition for
        </Text>
        <Text
          h2
          size={30}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
          everyone
        </Text>
        <Text h2 size={30} style={{ marginRight: 10 }} css={{ color: "white" }}>
          .
        </Text>
      </div>
      <Button
        css={{ boxShadow: "0px 2px 15px #0072f5", marginTop: 40 }}
        size="lg"
      >
        Start learning
      </Button>
    </main>
  </>
);
