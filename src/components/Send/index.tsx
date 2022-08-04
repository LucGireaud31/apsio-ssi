import { useMemo, useState } from "react";
import { View } from "react-native";
import { RoundedTop } from "../Layout/RoundedTop";
import { DisplayStep } from "./DisplayStep";
import { TabView, SceneMap } from "react-native-tab-view";
import { SelectDataView } from "./SelectDataView";
import { SelectSendTypeView } from "./SelectSendTypeView";
import { SendType, SharedValuesType } from "../../types/send";
import { GenerateQRCode } from "../GenerateQRCode";
import { getSpecifiedCards } from "../../../localApi";

const DEFAULT_SHAREDVALUES = {
  cards: [],
  profil: [],
};

export function Send() {
  const [step, setStep] = useState(0);

  const [sharedValues, setSharedValues] =
    useState<SharedValuesType>(DEFAULT_SHAREDVALUES);
  const [sendType, setSendType] = useState<SendType | undefined>();

  const valuesJSON = useMemo(() => {
    (async () => {
      const sharedCards = await getSpecifiedCards(
        sharedValues.cards.map((c) => c.value)
      );
      console.log("sharedCards :", JSON.stringify(sharedCards));
    })();
  }, [sharedValues]);

  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const renderScene = SceneMap({
    first: () =>
      SelectDataView({
        onNextStep: (sharedValues) => {
          setStep(1);
          setSharedValues(sharedValues);
        },
        defaultSharedValues: sharedValues,
      }),
    second: () =>
      SelectSendTypeView({
        onNextStep: (sendType) => {
          setSendType(sendType);
          setStep(2);
        },
      }),
    third:
      sendType == "generate"
        ? () => GenerateQRCode({ onQuit: reset, data: "" })
        : SecondRoute,
  });

  const [routes] = useState([
    { key: "first", title: "1" },
    { key: "second", title: "2" },
    { key: "third", title: "3" },
  ]);

  function reset() {
    setStep(0);
    setSharedValues(DEFAULT_SHAREDVALUES);
    setSendType(undefined);
  }

  return (
    <>
      <RoundedTop />
      <TabView
        navigationState={{ index: step, routes }}
        renderTabBar={() => (
          <DisplayStep steps={3} step={step} navigate={setStep} />
        )}
        renderScene={renderScene}
        onIndexChange={setStep}
        swipeEnabled={false}
      />
      {/* <GenerateQRCode /> */}
    </>
  );
}
