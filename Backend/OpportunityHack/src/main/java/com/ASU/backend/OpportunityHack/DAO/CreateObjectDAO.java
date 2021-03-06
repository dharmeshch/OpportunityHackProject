package com.ASU.backend.OpportunityHack.DAO;


import com.ASU.backend.OpportunityHack.Model.ObjectParameters;
import com.ASU.backend.OpportunityHack.Model.ObjectSchema;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Map;

@Repository
@Transactional
public class CreateObjectDAO {

    @PersistenceContext
    EntityManager entityManager;

    public Map<String, Object> createObject(ObjectSchema objectSchema){
        boolean isEvent = false;
        StringBuilder query = new StringBuilder("CREATE TABLE "+objectSchema.getEntityName()+" (");
        query.append("id SERIAL PRIMARY KEY,");
        for(ObjectParameters obj : objectSchema.getAttributes()){
            if(obj.getIsObject()!=null && obj.getIsObject()){
                query.append(obj.getName()+"_id");
                isEvent = true;
                query.append(" INTEGER REFERENCES ");
                query.append(obj.getName());
                query.append("(id)");
                associateTables(objectSchema.getEntityName(), obj.getName());
            }
            else {
                query.append(obj.getName());
                query.append(" ");
                query.append(obj.getDataType());
                if(obj.getIsUnique())
                    query.append(" UNIQUE");
            }
            if(obj.getIsMandatory())
                query.append(" NOT NULL");
            query.append(",");
        }
        query.setLength(query.length()-1);
        query.append(")");
        System.out.println(query);
        entityManager.createNativeQuery(query.toString()).executeUpdate();
        if(isEvent == true){
            Query q = entityManager.createNativeQuery("INSERT into events_tables(table_name) values (?)");
            q.setParameter(1,objectSchema.getEntityName());
            q.executeUpdate();
        }
        return null;
    }

    public void associateTables(String eventstableName, String objectTableName){
        Query q = entityManager.createNativeQuery("INSERT INTO events_objects_mapping (events_table_name, object_table_name) values (?, ?)");
        q.setParameter(1,eventstableName);
        q.setParameter(2, objectTableName);
        q.executeUpdate();
    }

//    public String returnDatatype(int i){
//        if(i == 1) return "INTEGER";
//        else if(i == 2) return "VARCHAR(100)";
//        else return "timestamp";
//    }
}
