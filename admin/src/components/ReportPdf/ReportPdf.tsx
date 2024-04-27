// @ts-nocheck
import React from "react";
import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { toReadableDate } from "helpers/utils";
import { expenseTypes } from "Common/constants/expense";
import { saveAs } from "file-saver";

// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    // height: "3508px",
    borderRadius: 5,
  },
  section: {
    padding: 10,
    color: "black",
    width: "100%",
  },
});

const daysPassed = (date: Date) => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// sum up amount field in all expenses
const sumAmount = (expenses: any) => {
  return expenses?.reduce((acc: any, item: any) => acc + item.amount, 0);
};

// check if a service in expenses is empty
const checkEmpty = (expenses: any, service: string) => {
  return expenses?.filter((item: any) => item.service === service).length === 0;
};

// Create Document Component
const ReportPdf = ({ report }: { report: any }) => (
  <>
    <Document style={{ width: "100%" }} className="w-full">
      <Page
        size="A4"
        style={styles.page}
        className="flex flex-col w-full"
      >
        <View
          style={styles.section}
          className="flex justify-center  h-fit items-center"
        >
          <Text className="font-medium text-xl mx-auto text-center">
            Evendo LUXURY MOTOR VEHICLES SERVICE L.L.C
          </Text>
        </View>
        <View style={styles.section} className="flex flex-col gap-1">
          <View className="flex flex-row gap-4">
            <Text className="font-semibold">Employee Name</Text>
            <Text>{report?.user.name}</Text>
          </View>
          <View className="flex flex-row gap-4">
            <Text className="font-semibold">Date of Joining</Text>
            <Text>{report ? toReadableDate(report?.createdAt) : ""}</Text>
          </View>
          <View className="flex flex-row gap-4">
            <Text className="font-semibold">Vehicle Registration Number</Text>
            <Text>{report?.assignedVehicle.registrationNumber}</Text>
          </View>
        </View>
        <View className="flex flex-row">
          <View
            style={styles.section}
            className="flex flex-col w-1/2"
          >
            <View className="flex flex-col w-full gap-1 p-1">
              <View className="flex font-semibold flex-row justify-between">
                <Text>Particulars</Text>
                <Text>Amount AED</Text>
              </View>
              <View className=" flex flex-row items-center  pb-1 justify-between w-full">
                <Text className="w-1/3 font-semibold">UBER</Text>
                <View className="w-full">
                  {!checkEmpty(report?.expenses, "uber")
                    ? report?.expenses.filter((item) =>
                      item.service.toLowerCase() == "uber"
                    ).map((item, index) => (
                      <View className="flex flex-col border-l-custom-300 pl-2 gap-1 border-l w-full">
                        <View className="flex flex-row justify-between pb-1 ">
                          <Text className="">
                            {toReadableDate(item.expenseDate)}
                          </Text>
                          <Text className=" text-end">
                            {item.amount}
                          </Text>
                        </View>
                      </View>
                    ))
                    : (
                      <View className="flex flex-col border-l-custom-300 pl-2 gap-1 border-l w-full">
                        <View className="flex flex-row justify-between pb-1 ">
                          <Text className="w-full text-end">
                            N/A
                          </Text>
                        </View>
                      </View>
                    )}
                </View>
              </View>
              <View className=" flex flex-row items-center justify-between w-full">
                <Text className="w-1/3 font-semibold">
                  YANGO
                </Text>
                <View className="w-full">
                  {!checkEmpty(report?.expenses, "yango")
                    ? report?.expenses.filter((item) =>
                      item.service.toLowerCase() == "yango"
                    ).map((item, index) => (
                      <View className="flex flex-col border-l-custom-300 pl-2 gap-1 border-l w-full">
                        <View className="flex flex-row justify-between pb-1 ">
                          <Text className="">
                            {toReadableDate(item.expenseDate)}
                          </Text>
                          <Text className=" text-end">
                            {item.amount}
                          </Text>
                        </View>
                      </View>
                    ))
                    : (
                      <View className="flex flex-col border-l-custom-300 pl-2 gap-1 border-l w-full">
                        <View className="flex flex-row justify-between pb-1 ">
                          <Text className="w-full text-end">
                            N/A
                          </Text>
                        </View>
                      </View>
                    )}
                </View>
              </View>

              <View className=" flex flex-row items-center justify-between w-full">
                <Text className="w-1/3 font-semibold">CAREEM</Text>
                <View className="w-full">
                  {!checkEmpty(report?.expenses, "careem")
                    ? report?.expenses.filter((item) =>
                      item.service.toLowerCase() == "careem"
                    ).map((item, index) => (
                      <View className="flex flex-col border-l-custom-300 pl-2 gap-1 border-l w-full">
                        <View className="flex flex-row justify-between pb-1 ">
                          <Text className="">
                            {toReadableDate(item.expenseDate)}
                          </Text>
                          <Text className=" text-end">
                            {item.amount}
                          </Text>
                        </View>
                      </View>
                    ))
                    : (
                      <View className="flex flex-col border-l-custom-300 pl-2 gap-1 border-l w-full">
                        <View className="flex flex-row justify-between pb-1 ">
                          <Text className="w-full text-end">
                            N/A
                          </Text>
                        </View>
                      </View>
                    )}
                </View>
              </View>
              <View className="flex mt-2 bg-custom-100 rounded p-1 font-semibold items-center flex-row justify-between">
                <Text className="text-custom-600">Total</Text>
                <Text className="text-custom-600">
                  {report ? sumAmount(report?.expenses) : 0}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={styles.section}
            className="flex flex-col w-1/2"
          >
            <View className="flex flex-col w-full gap-1 p-1">
              <View className="flex font-semibold flex-row justify-between">
                <Text>Particulars</Text>
                <Text>Amount AED</Text>
              </View>
              <View className="flex flex-col justify-between">
                {expenseTypes.map((item) => (
                  <View className="flex flex-row justify-between w-full">
                    <Text>{item.title}</Text>
                    <Text>
                      {report?.expenses.filter(
                          (expense) => expense.expenseType == item.value,
                        ).length > 0
                        ? report?.expenses
                          .filter(
                            (expense) => expense.expenseType == item.value,
                          )
                          .reduce((acc, item) => acc + item.amount, 0)
                        : 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View className="flex mt-2 bg-custom-100 rounded p-1 items-center font-semibold flex-row justify-between">
                <Text className="text-custom-600">Total</Text>
                <Text className="text-custom-600">
                  {report ? sumAmount(report?.expenses) : 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  </>
);

export default ReportPdf;
