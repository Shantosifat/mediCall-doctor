"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Stethoscope, User } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { setUserRole } from "@/actions/onBoarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SPECIALTIES } from "@/lib/specialities";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const doctorFormSchema = z.object({
  specialty: z.string().min(1, "Specialty is required"),
  experience: z
    .number({ invalid_type_error: "Experience must be a number" })
    // .int()
    .min(1, "Experience must be at least 1 year")
    .max(70, "Experience must be less than 70 years"),
  credentialUrl: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Credential URL is required"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters"),
});

const OnboardingPage = () => {
  const [step, setStep] = useState("choose-role");
  const router = useRouter();

  const { data, fn: submitUserRole, loading } = useFetch(setUserRole);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialityValue = watch("specialty");

  const handlePatientSelection = async () => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "PATIENT");
    await submitUserRole(formData);
  };

  useEffect(() => {
    if (data && data?.success) {
      toast.success("Role Updated!");
      router.push(data.redirect);
    }
  }, [data]);

  const doctorFormSubmit = async (values) => {
    if (loading) return;
    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("specialty", values.specialty);
    formData.append("experience", values.experience);
    formData.append("credentialUrl", values.credentialUrl);
    formData.append("description", values.description);

    await submitUserRole(formData);
  };

  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* for patient */}
        <Card
          onClick={() => !loading && handlePatientSelection()}
          className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all"
        >
          <CardContent className="py-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Patient
            </CardTitle>
            <CardDescription className="mb-4">
              Book appointments, consult with doctors, and manage your
              healthcare journey.
            </CardDescription>
            <Button
              className="w-full mt-2 border-e-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                " Continue as a Patient"
              )}
            </Button>
          </CardContent>
        </Card>
        {/* for doctor */}
        <Card
          onClick={() => !loading && setStep("doctor-form")}
          className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all"
        >
          <CardContent className="py-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Doctor
            </CardTitle>
            <CardDescription className="mb-4">
              Create your professional profile, set your availability, and
              provide consultations.
            </CardDescription>
            <Button
              className="w-full mt-2 border-e-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              Continue as a Doctor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (step === "doctor-form") {
    return (
      <Card className="max-w-2xl mx-auto border-emerald-900/20">
        <CardContent className="p-6">
          <CardTitle className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-emerald-400" />
            Complete your Profile
          </CardTitle>
          <CardDescription className="mb-6">
            Fill in your professional details to create your doctor profile.
          </CardDescription>

          <form
          onSubmit={handleSubmit(doctorFormSubmit)}
           className="space-y-6">
            {/* Specialty */}
            <div className="space-y-2">
              <Label htmlFor="speciality">Specialty</Label>

              <Select
                value={specialityValue}
                onValueChange={(value) => setValue("specialty", value)}
              >
                <SelectTrigger id="speciality">
                  <SelectValue placeholder="Select your speciality" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map((spec) => {
                    return (
                      <SelectItem key={spec.name} value={spec.name}>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400">{spec.icon}</span>
                          {spec.name}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.specialty && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.specialty.message}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-300">
                Years of Experience
              </Label>
              <Input
                id="experience"
                type="number"
                placeholder="e.g. 5"
                {...register("experience", { valueAsNumber: true })}
                className="w-full px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.experience && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Credential URL */}
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-300">
                Credential / Certification URL
              </Label>
              <Input
                id="credentialUrl"
                type="url"
                placeholder="https://example.com/certificate"
                {...register("credentialUrl")}
                className="w-full px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.credentialUrl && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.credentialUrl.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label className="block mb-1 text-sm font-medium text-gray-300">
                Professional Bio
              </Label>
              <Textarea
                rows={4}
                placeholder="Tell us about your background, skills, and expertise..."
                {...register("description")}
                className="w-full px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              {errors.description && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("choose-role")}
                disabled={loading}
                className="border-emerald-700 text-white hover:bg-emerald-800/40"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="bg-emerald-700 hover:bg-emerald-800"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit & Continue"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }
};

export default OnboardingPage;
