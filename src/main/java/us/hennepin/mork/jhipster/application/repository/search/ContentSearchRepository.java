package us.hennepin.mork.jhipster.application.repository.search;

import us.hennepin.mork.jhipster.application.domain.Content;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Content entity.
 */
public interface ContentSearchRepository extends ElasticsearchRepository<Content, Long> {
}
