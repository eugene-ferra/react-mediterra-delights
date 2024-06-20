import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Legend,
  Rectangle,
  ComposedChart,
  LabelList,
} from "recharts";
import { useYearStats } from "./useYearStats";
import { useMonthStats } from "./useMonthStats";
import Title from "../../common/Title/Title";
import Text from "../../common/Text/Text";
import Button from "../../common/Button/Button";
import InputSelect from "../../common/InputSelect/InputSelect";
import PageLoader from "../../layout/PageLoader/PageLoader";
import FieldSet from "../FieldSet/FieldSet";
import BtnBlock from "../BtnBlock/BtnBlock";
import styles from "./AdminMain.module.scss";
import errorImg from "../../../assets/default.jpg";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className="label">{`Дохід : ${payload[0].payload["Дохід"].toFixed(
          2
        )} грн`}</p>
        <p className="label">{`Замовлення : ${payload[0].payload["orders"]}`}</p>
        <p className="label">{`Середній чек : ${payload[0].payload[
          "Середній чек"
        ].toFixed(2)} грн`}</p>
      </div>
    );
  }

  return null;
};
const CustomProductTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className="label">{`Назва: ${
          payload[0]?.payload?.product?.[0]?.title || "Страву видалено"
        }`}</p>
        {payload[0]?.payload?.product?.[0]?.category && (
          <p className="label">{`Категорія: ${payload[0]?.payload?.product?.[0]?.category}`}</p>
        )}
        <p className="label">{`Продано: ${payload[0]?.payload?.["Кількість продажів"]} шт`}</p>
      </div>
    );
  }

  return null;
};

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  const radius = 10;

  return (
    <g>
      <image
        href={value[0]?.imgCover?.jpg || errorImg}
        x={x + width / 2 - width / 2} //
        y={y - radius - 50}
        width={width}
        height={60}
      />
    </g>
  );
};

const months = new Map([
  [1, "Січень"],
  [2, "Лютий"],
  [3, "Березень"],
  [4, "Квітень"],
  [5, "Травень"],
  [6, "Червень"],
  [7, "Липень"],
  [8, "Серпень"],
  [9, "Вересень"],
  [10, "Жовтень"],
  [11, "Листопад"],
  [12, "Грудень"],
]);

const AdminMain = () => {
  const _thisYear = new Date().getFullYear();

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [isYearOnlyStats, setIsYearOnlyStats] = useState(false);
  const methods = useForm();

  useEffect(() => {
    methods.setValue("month", months.get(currentMonth));
  }, [methods, currentMonth]);

  useEffect(() => {
    methods.setValue("year", currentYear);
  }, [methods, currentYear]);

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      if (value.month && value.year) {
        setCurrentMonth([...months.values()].indexOf(value.month) + 1);
        setCurrentYear(value.year);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const {
    stats: yearStats,
    error: yearError,
    isLoading: isYearLoading,
  } = useYearStats(currentYear);
  const {
    stats: monthStats,
    error: monthError,
    isLoading: isMonthLoading,
  } = useMonthStats(currentYear, currentMonth);

  return (
    <>
      <Title>Прибутки ресторану</Title>

      <div className={styles.box}>
        <BtnBlock>
          <Button
            onClick={() => setIsYearOnlyStats(true)}
            type={!isYearOnlyStats ? "outline-red" : "default"}
          >
            Річна статистика
          </Button>
          <Button
            onClick={() => setIsYearOnlyStats(false)}
            type={isYearOnlyStats ? "outline-red" : "default"}
          >
            Місячна статистика
          </Button>
        </BtnBlock>

        {isYearOnlyStats && (
          <>
            <FormProvider {...methods}>
              <InputSelect
                valuesArr={[
                  ...Array.from(
                    { length: _thisYear - 2022 },
                    (_, index) => 2023 + index
                  ),
                ]}
                name={"year"}
                placeholder={currentYear}
              />
            </FormProvider>

            {isYearLoading && <PageLoader />}
            {yearError && isYearOnlyStats && (
              <Text>Даних за цей перід не знайдено!</Text>
            )}

            {!isYearLoading && yearStats && (
              <div className={styles.chartBox}>
                <ResponsiveContainer className={styles.chart}>
                  <ComposedChart
                    margin={{ top: 50 }}
                    data={yearStats?.incomeStats?.map((item) => {
                      return {
                        month: months.get(item.month),
                        orders: item.orders,
                        Дохід: item.totalSum,
                        "Середній чек": item.avgOrderSum,
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="Дохід"
                      fill="var(--secondary-light-color)"
                      activeBar={<Rectangle fill={`var(--selection-light-color)`} />}
                      width={40}
                      maxBarSize={40}
                      animationDuration={0}
                    />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Середній чек"
                      stroke="var(--accent-color)"
                      strokeWidth={2}
                      animationDuration={0}
                    />
                  </ComposedChart>
                </ResponsiveContainer>

                <ResponsiveContainer className={styles.chart}>
                  <BarChart
                    margin={{ top: 50 }}
                    data={yearStats?.topSalers?.map((item) => {
                      return {
                        id: item?.id,
                        product: item?.product,
                        "Кількість продажів": item?.quantity,
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomProductTooltip />} />
                    <Bar
                      dataKey="Кількість продажів"
                      fill="var(--secondary-light-color)"
                      activeBar={<Rectangle fill={`var(--selection-light-color)`} />}
                      width={40}
                      maxBarSize={40}
                      animationDuration={0}
                    >
                      <LabelList dataKey="product" content={renderCustomizedLabel} />
                    </Bar>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}

        {!isYearOnlyStats && (
          <>
            <FormProvider {...methods}>
              <FieldSet>
                <InputSelect
                  valuesArr={[...months.values()]}
                  name={"month"}
                  placeholder={months.get(currentMonth)}
                />
                <InputSelect
                  valuesArr={[
                    ...Array.from(
                      { length: _thisYear - 2022 },
                      (_, index) => 2023 + index
                    ),
                  ]}
                  name={"year"}
                  placeholder={currentYear}
                />
              </FieldSet>
            </FormProvider>

            {isMonthLoading && <PageLoader />}
            {monthError && !isYearOnlyStats && (
              <Text>Даних за цей перід не знайдено!</Text>
            )}

            {!isMonthLoading && monthStats && (
              <div className={styles.chartBox}>
                <ResponsiveContainer className={styles.chart}>
                  <ComposedChart
                    margin={{ top: 50 }}
                    data={monthStats?.incomeStats?.map((item) => {
                      return {
                        day: item.day,
                        orders: item.orders,
                        Дохід: item.totalSum,
                        "Середній чек": item.avgOrderSum,
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="Дохід"
                      fill="var(--secondary-light-color)"
                      activeBar={<Rectangle fill={`var(--selection-light-color)`} />}
                      width={40}
                      maxBarSize={40}
                      animationDuration={0}
                    />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Середній чек"
                      stroke="var(--accent-color)"
                      strokeWidth={2}
                      animationDuration={0}
                    />
                  </ComposedChart>
                </ResponsiveContainer>

                <ResponsiveContainer className={styles.chart}>
                  <BarChart
                    margin={{ top: 50 }}
                    data={monthStats?.topSalers?.map((item) => {
                      return {
                        id: item?.id,
                        product: item?.product,
                        "Кількість продажів": item?.quantity,
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip content={<CustomProductTooltip />} />
                    <Bar
                      dataKey="Кількість продажів"
                      fill="var(--secondary-light-color)"
                      activeBar={<Rectangle fill={`var(--selection-light-color)`} />}
                      width={40}
                      animationDuration={0}
                      maxBarSize={40}
                      height={10}
                    >
                      <LabelList dataKey="product" content={renderCustomizedLabel} />
                    </Bar>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Legend />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminMain;
