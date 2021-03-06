package com.ASU.backend.OpportunityHack.Controller;


import com.ASU.backend.OpportunityHack.DAO.BulkInsertDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@CrossOrigin
public class BulkInsertController {

    @Autowired
    BulkInsertDAO bulkInsertDAO;

    @RequestMapping(value = "/bulk-import", method = RequestMethod.POST)
    public Map<String, Object> da(@RequestParam(value = "data")MultipartFile file,
                                             @RequestParam(value = "tableName",required = true) String tableName) throws IOException {
        bulkInsertDAO.insertCSV(tableName, file);
        return null;
    }
}
