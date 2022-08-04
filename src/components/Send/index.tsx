import { useState } from "react";
import { View } from "react-native";
import { RoundedTop } from "../Layout/RoundedTop";
import { DisplayStep } from "./DisplayStep";
import { TabView, SceneMap } from "react-native-tab-view";
import { SelectDataView, SharedValuesType } from "./SelectDataView";
import { SelectSendTypeView } from "./SelectSendTypeView";

export function Send() {
  const [step, setStep] = useState(0);

  const [sharedValues, setSharedValues] = useState<SharedValuesType>({
    cards: [],
    profil: [],
  });

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
        onNextStep: () => {
          setStep(2);
        },
        sharedValues,
      }),
    third: SecondRoute,
  });

  const [routes] = useState([
    { key: "first", title: "1" },
    { key: "second", title: "2" },
    { key: "third", title: "3" },
  ]);

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
    </>
  );
}
