package us.hennepin.mork.jhipster.application.repository;

import us.hennepin.mork.jhipster.application.domain.Content;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Content entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

}
