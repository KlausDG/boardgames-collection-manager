export interface ScrapperAdapter {
  scrape(url: string): Promise<any>;
}
