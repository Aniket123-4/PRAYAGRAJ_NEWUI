// src/pages/ZonePage.tsx
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    fetchZones,
    createZone,
    updateZone,
    
} from "../../redux/slices/zoneSlice";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";
import { IoMdRefresh } from "react-icons/io";
import { useTheme } from "../../contexts/ThemeContext";
import { themeClasses as tc } from "../../components/ThemeClasses";

interface ZoneForm {
    id?: number;
    name: string;
    code: string;
}

const ZonePage: React.FC = () => {
    const defaultZoneForm: ZoneForm = {
        id: undefined,
        name: "",
        code: "",
    };
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state) => state.zone);
    const { theme } = useTheme();
    const t = tc(theme);

    const [form, setForm] = useState<ZoneForm>(defaultZoneForm);
    const [errors, setErrors] = useState<{ name?: string; code?: string }>({});
    const [editingId, setEditingId] = useState<number | null>(null);


    const [originalData, setOriginalData] = useState<ZoneForm | null>(null);

    useEffect(() => {
        dispatch(fetchZones());
    }, [dispatch]);

    const handleInputChange = (field: keyof ZoneForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!form.name) newErrors.name = "Zone name is required";
        if (!form.code) newErrors.code = "Zone code is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (editingId) {
                await dispatch(
                    updateZone({ id: editingId, name: form.name, code: form.code })
                ).unwrap();
                toast.success("Zone updated successfully");
            } else {
                await dispatch(
                    createZone({ name: form.name, code: form.code })
                ).unwrap();
                toast.success("Zone created successfully");
            }
            handleReset(true);
            dispatch(fetchZones());
        } catch (error) {
            toast.error("An error occurred while saving the zone");
        }
    };



 
    const handleReset = (clear = false) => {
        if (!clear && editingId && originalData) {
            setForm(originalData);
        } else {
            setForm(defaultZoneForm);
            setEditingId(null);
            setOriginalData(null);
        }
    };

    return (
        <div className={`w-full px-4 py-6 transition-colors ${t.background} ${t.text}`}>
            <div className="flex items-center gap-2 mb-4">
                {/* <MapPin className="w-6 h-6 text-indigo-600" /> */}
                <h1 className="text-2xl font-semibold">Change Password</h1>
            </div>

            {/* Form */}
            {/* {(permission?.isAdd || editingId !== null) && ( */}
            <div className={`rounded-xl shadow-md p-4 mb-6 transition-colors ${t.card}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        placeholder="Enter Login Email"
                        label="Login Email"
                        value={form.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        error={errors.name}
                    />
                    <TextField
                        placeholder="Enter Old Password"
                        label="Old Password"
                        value={form.code}
                        onChange={(e) => handleInputChange("code", e.target.value)}
                        error={errors.code}
                    />
                    <TextField
                        placeholder="Enter New Password"
                        label="New Password"
                        value={form.code}
                        onChange={(e) => handleInputChange("code", e.target.value)}
                        error={errors.code}
                    />
                    <TextField
                        placeholder="Enter Repeat Password"
                        label="Repeat Password"
                        value={form.code}
                        onChange={(e) => handleInputChange("code", e.target.value)}
                        error={errors.code}
                    />
                </div>
                <div className="mt-4 flex gap-4">
                    <Button
                        // icon={editingId ? <FaEdit /> : <FiPlus />}
                        text={"Save"}
                        onClick={handleSubmit}
                        bgColor={theme === "dark" ? "bg-blue-700" : "bg-blue-900"}
                        disabled={loading}
                    />
                    <Button
                        icon={<IoMdRefresh />}
                        text="Reset"
                        onClick={() => handleReset()}
                        bgColor={theme === "dark" ? "bg-red-700" : "bg-red-600"}
                        disabled={loading}
                    />
                </div>
            </div>
            {/* )} */}




        </div>
    );
};

export default ZonePage;