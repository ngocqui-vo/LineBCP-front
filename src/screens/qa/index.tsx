import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ScrollWrapper from "@/components/scrollWrapper/ScrollWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import useGetListQA from "@/services/QA/hooks/useGetListQA";
import { Fragment, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const QAScreen = () => {
  //!State
  const { t } = useTranslation("shared");
  const { filters, setFilters } = useFiltersHandler({
    page: 1,
    pageSize: 20,
  });
  const { data, hasMore, loading = false, loadingMore = false, refetching = false } = useGetListQA(filters);

  // !Function
  const content = useCallback(() => {
    if (loading && filters.page === 1) {
      return <Fragment />;
    }
    return (
      <ScrollWrapper
        onScrollEnd={() => {
          if (hasMore) {
            setFilters((prev: any) => ({
              ...prev,
              page: prev.page + 1,
            }));
          }
        }}
      >
        <Accordion type="single" collapsible>
          <div className="grid grid-col gap-[12px]">
            {data?.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border-0 p-2 py-3 rounded-[4px]">
                <AccordionTrigger>{item?.question}</AccordionTrigger>
                <AccordionContent className="border-t border-borderColor-gray w-full pt-4 !pb-0">
                  {item?.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </Accordion>
      </ScrollWrapper>
    );
  }, [loading, hasMore, data, setFilters, filters]);

  //! Render
  return (
    <PageWrapper
      name="QAScreen"
      titlePage={t("qa.title")}
      isLoading={loading || loadingMore || refetching}
      className="bg-backgroundColor-qaBackground min-h-full h-auto"
      classNameChildren="bg-backgroundColor-qaBackground"
    >
      <Helmet>
        <title>{t("qa.title")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};

export default QAScreen;
