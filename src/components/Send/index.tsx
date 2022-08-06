import { useEffect, useState } from "react";
import { Text } from "react-native";
import { RoundedTop } from "../Layout/RoundedTop";
import { DisplayStep } from "./DisplayStep";
import { TabView, SceneMap } from "react-native-tab-view";
import { SelectDataView } from "./SelectDataView";
import { SelectSendTypeView } from "./SelectSendTypeView";
import { SendType, SharedValuesType } from "../../types/send";
import { GenerateQRCode } from "../GenerateQRCode";
import { getSpecifiedCards } from "../../../localApi";
import * as Clipboard from "expo-clipboard";
import { ScanQRCode } from "../ScanQRCode";
import Toast from "react-native-toast-message";
import { useSetAtom } from "jotai";
import { atomIsDataInvalidate } from "../Layout/Footer";

const DEFAULT_SHAREDVALUES = {
  cards: [],
  profil: [],
};

export function Send() {
  const [step, setStep] = useState(0);

  const [sharedValues, setSharedValues] =
    useState<SharedValuesType>(DEFAULT_SHAREDVALUES);
  const [sendType, setSendType] = useState<SendType | undefined>();

  const setIsDataInvalidate = useSetAtom(atomIsDataInvalidate);

  useEffect(() => {
    if (step != 0) {
      setIsDataInvalidate(true);
    }
  }, [step]);

  async function getJSONValue() {
    const result: { [key: string]: any } = {};

    // Profil
    Object.entries(sharedValues.profil).forEach((entry) => {
      result[entry[1].value] = entry[1].label;
    });

    // Cards
    const cards = await getSpecifiedCards(
      sharedValues.cards.map((c) => c.value)
    );
    if (cards && cards.length > 0) {
      result["cards"] = cards;
    }
    return result;
  }

  const renderScene = SceneMap({
    first: () =>
      step == 0 ? (
        SelectDataView({
          onNextStep: (sharedValues) => {
            setStep(1);
            setSharedValues(sharedValues);
          },
          defaultSharedValues: sharedValues,
        })
      ) : (
        <></>
      ),
    second: () =>
      step == 1 ? (
        SelectSendTypeView({
          onNextStep: (sendType) => {
            setSendType(sendType);

            if (sendType == "copy") {
              onCopy(getJSONValue);
              return;
            }
            setStep(2);
          },
        })
      ) : (
        <></>
      ),
    third: () =>
      step == 2 ? (
        sendType == "generate" ? (
          GenerateQRCode({ onQuit: reset, getJSON: getJSONValue })
        ) : (
          ScanQRCode({ getJSON: getJSONValue, onQuit: reset })
        )
      ) : (
        <></>
      ),
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
    </>
  );
}

async function onCopy(
  getJSON: () => Promise<{
    [key: string]: any;
  }>
) {
  Toast.show({
    type: "success",
    text1: "Copiées",
    text2: "Vos données ont été copiées dans le presse papier",
    visibilityTime: 4000,
  });

  Clipboard.setString(JSON.stringify(await getJSON()));
}
