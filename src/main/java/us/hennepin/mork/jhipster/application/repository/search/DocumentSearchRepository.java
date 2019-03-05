package us.hennepin.mork.jhipster.application.repository.search;

import us.hennepin.mork.jhipster.application.domain.Document;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Document entity.
 */
public interface DocumentSearchRepository extends ElasticsearchRepository<Document, Long> {
}
