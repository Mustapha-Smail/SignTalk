package fr.parisnanterre.miage.dict;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table
public class Dictionary {

    @Id
    @SequenceGenerator(
        name = "dictionary_sequence",
        sequenceName = "dictionary_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "dictionary_sequence"
    )
    private Long id; 
    private String name; 
    private String url;

    public Dictionary(){}

    public Dictionary(Long id, String name, String url){
        this.id = id; 
        this.name = name; 
        this.url = url;
    }

    public Dictionary(String name, String url){
        this.name = name; 
        this.url = url; 
    }

    public String getName() {
        return name;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public String toString() {
        return "Dictionary {" + 
                "word: " + name +
                "url: " + url +
                "}";
    }
}
