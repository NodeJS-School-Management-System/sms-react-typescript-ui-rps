import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "../components/appbar/AppBar";
import Footer from "../components/footer/Footer";
const ThemeCustomizer = lazy(
  () => import("../components/customizer/Customizer")
);
import { Flex } from "../components/layout";
import AppLayout from "../components/layout/AppLayout";
import PageLoading from "../components/loading/PageLoading";
import Nav from "../components/nav/Nav";
const PageNotFound = lazy(() => import("./404/PageNotFound"));
// const Analytics = lazy(() => import("./analytics"));
const CRM = lazy(() => import("./crm/CRM"));
const Student = lazy(() => import("./student"));
const Teacher = lazy(() => import("./teacher"));
const Class = lazy(() => import("./class"));
const ExamSection = lazy(() => import("./examsection"));
const ExamAndResult = lazy(() => import("./examandresult"));
const NTStaffMembers = lazy(() => import("./nonteachingstaff"));
const AccountingSection = lazy(() => import("./accountingsection"));
const Library = lazy(() => import("./library"));
const Message = lazy(() => import("./message"));
const NoticeBoard = lazy(() => import("./noticeboard"));
const Home = () => {
  return (
    <AppLayout>
      <Nav />
      <Flex direction="column" styles={{ minHeight: "100vh" }}>
        <AppBar />
        <main
          style={{
            padding: `1.2rem`,
            width: "100%",
            flex: 1,
            marginTop: "1rem",
          }}
        >
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route index element={<CRM />} />
              <Route path="/dashboards/crm/" element={<CRM />} />
              <Route path="/student/*" element={<Student />} />
              <Route path="/teacher/*" element={<Teacher />} />
              <Route path="/nonteachingstaff/*" element={<NTStaffMembers />} />
              <Route path="/classroom/*" element={<Class />} />

              <Route
                path="/accountingsection/*"
                element={<AccountingSection />}
              />
              <Route path="/library/*" element={<Library />} />
              <Route path="/examsection/*" element={<ExamSection />} />
              <Route path="/examandresult/*" element={<ExamAndResult />} />
              <Route path="/message/*" element={<Message />} />
              <Route path="/noticeboard/*" element={<NoticeBoard />} />

              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Flex>
      <ThemeCustomizer />
    </AppLayout>
  );
};
export default Home;
