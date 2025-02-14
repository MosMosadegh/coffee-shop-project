"use client";
import { useState } from "react";
import Select from "react-select";
import { showSwal } from "@/utils/helpers";
import styles from "./totals.module.css";
import stateData from "@/utils/stateData";

const stateOptions = stateData();

const AddressSelector = ({ onAddressChange }) => {
  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [citySelectedOption, setCitySelectedOption] = useState(null);
  const [postalCode, setPostalCode] = useState("");

  const handleAddressChange = () => {
    if (!stateSelectedOption || !citySelectedOption) {
      showSwal("لطفاً استان و شهر را انتخاب کنید", "error", "فهمیدم");
      return;
    }

    const address = {
      state: stateSelectedOption.label,
      city: citySelectedOption.label,
      postalCode,
    };

    onAddressChange(address); // ارسال آدرس به کامپوننت والد
  };

  return (
    <div className="mt-4 flex-col">
      <Select
        defaultValue={stateSelectedOption}
        onChange={(option) => {
          setStateSelectedOption(option);
          setCitySelectedOption(null); // Reset city when state changes
        }}
        isClearable={true}
        placeholder={"استان"}
        isRtl={true}
        isSearchable={true}
        options={stateOptions.map((state) => ({
          label: state.label,
          value: state.label,
        }))}
      />
      <Select
        value={citySelectedOption}
        onChange={setCitySelectedOption}
        isClearable={true}
        placeholder={"شهر"}
        isRtl={true}
        isSearchable={true}
        options={
          stateSelectedOption
            ? stateOptions
                .find((state) => state.label === stateSelectedOption.value)
                .value.map((city) => ({ label: city, value: city }))
            : []
        }
        isDisabled={!stateSelectedOption}
      />
      <input
        type="number"
        placeholder="کد پستی"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
      />
      <button
        onClick={handleAddressChange}
        className={styles.update_address_btn}
      >
        بروزرسانی آدرس
      </button>
    </div>
  );
};

export default AddressSelector;
