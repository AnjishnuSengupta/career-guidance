"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";

interface FirstTimeModalProps {
  onClose: () => void;
}

export function FirstTimeModal({ onClose }: FirstTimeModalProps) {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useLocalStorage<{
    interests: string[];
    location: { city: string; state: string };
    videoPreferences: string[];
  }>("user_preferences", {
    interests: [],
    location: { city: "", state: "" },
    videoPreferences: [],
  });

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [location, setLocation] = useState({ city: "", state: "" });
  const [selectedVideoPrefs, setSelectedVideoPrefs] = useState<string[]>([]);

  const interests = [
    "Mathematics & Physics",
    "Business & Economics",
    "Literature & Arts",
    "Biology & Chemistry",
    "Computer Science",
    "Social Sciences",
    "Engineering",
    "Media & Communication",
  ];

  const videoPreferences = [
    "Career Guidance",
    "Course Overviews",
    "Student Experiences",
    "Industry Insights",
    "University Tours",
    "Admission Tips",
    "Scholarship Information",
    "Job Market Trends",
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleVideoPreference = (pref: string) => {
    setSelectedVideoPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Save all preferences
      setPreferences({
        interests: selectedInterests,
        location,
        videoPreferences: selectedVideoPrefs,
      });
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        // Only allow closing through the buttons, not by clicking outside
        if (!open && step === 3) {
          // Only close if user has completed all steps and clicked "Save"
          onClose();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-xl"
        onPointerDownOutside={(e) => {
          // Prevent closing when clicking outside
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          // Prevent closing with Escape key
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Welcome to Pathway!</DialogTitle>
          <DialogDescription>
            Let's personalize your experience to help you find the perfect
            career path.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {i}
                </div>
                {i < 3 && (
                  <div
                    className={`h-1 w-16 ${
                      i < step ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Interests */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                What subjects interest you?
              </h3>
              <p className="text-gray-600 mb-4">
                Select all that apply. This helps us recommend suitable career
                paths.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <Button
                    key={interest}
                    variant={
                      selectedInterests.includes(interest)
                        ? "default"
                        : "outline"
                    }
                    className={`justify-start ${
                      selectedInterests.includes(interest)
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Where are you located?</h3>
              <p className="text-gray-600 mb-4">
                This helps us recommend nearby institutions and opportunities.
              </p>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    value={location.city}
                    onChange={(e) =>
                      setLocation((prev) => ({ ...prev, city: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    State/Province
                  </label>
                  <Input
                    id="state"
                    placeholder="Enter your state or province"
                    value={location.state}
                    onChange={(e) =>
                      setLocation((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Video Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                What content would you like to see?
              </h3>
              <p className="text-gray-600 mb-4">
                Select the types of videos and resources that interest you most.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {videoPreferences.map((pref) => (
                  <Button
                    key={pref}
                    variant={
                      selectedVideoPrefs.includes(pref) ? "default" : "outline"
                    }
                    className={`justify-start ${
                      selectedVideoPrefs.includes(pref)
                        ? "bg-purple-600 text-white"
                        : "hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                    }`}
                    onClick={() => toggleVideoPreference(pref)}
                  >
                    {pref}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="mb-2 sm:mb-0"
            >
              Back
            </Button>
          )}
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleNext}
          >
            {step < 3 ? "Next" : "Save Preferences & Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
