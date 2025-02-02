import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Link } from "react-router-dom";
import AuthFormContent from "./AuthFormContent";

const Auth = () => {
  const [role, setRole] = useState<"user" | "employer">("user");

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F4F6F9] dark:bg-[#002B5B]">
      <div className="flex   w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white dark:bg-[#001D3D] text-[#333] dark:text-white">
        {/* Left Side - Image Section */}
        <div
          className="w-1/2 bg-cover bg-center hidden md:block "
          style={{
            backgroundImage:
              "url('https://cdn.pixabay.com/photo/2024/01/24/21/38/lady-8530604_960_720.png')",
          }}
        ></div>

        {/* Right Side - Auth Forms */}
        <div className="w-full md:w-1/2 p-8">
          <Card className="bg-transparent border-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold">
                GetAJob
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="user" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="user" onClick={() => setRole("user")}>
                    User
                  </TabsTrigger>
                  <TabsTrigger
                    value="employer"
                    onClick={() => setRole("employer")}
                  >
                    Employeer
                  </TabsTrigger>
                </TabsList>

                {/* User Login FORM */}
                <TabsContent value="user">
                  <AuthFormContent role={role} />
                  {/* Passed the content as another component so logic handled there */}
                </TabsContent>

                {/* Employeer Login FORM */}
                <TabsContent value="employer">
                  <AuthFormContent role={role} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
