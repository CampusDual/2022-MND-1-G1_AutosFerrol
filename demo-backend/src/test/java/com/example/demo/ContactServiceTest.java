package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.isA;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.borjaglez.springify.repository.filter.impl.AnyPageFilter;
import com.borjaglez.springify.repository.specification.SpecificationImpl;
import com.example.demo.dto.ContactDTO;
import com.example.demo.dto.mapper.ContactMapper;
import com.example.demo.entity.Contact;
import com.example.demo.repository.ContactRepository;
import com.example.demo.service.ContactServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

	@InjectMocks
	ContactServiceImpl contactService;

	@Mock
	ContactRepository contactRepository;

//	@Test
//	void getOneContactTest() {
//		when(contactRepository.findById(1)).thenReturn(
//				Optional.of(new Contact(1, "One", "Surname1One", "Surname2One", 666555444, "contact-one@gmail.com")));
//
//		ContactDTO contact = contactService.getContact(1);
//
//		assertNotNull(contact);
//	}
//
//	@Test
//	void contactNotPresentInDb() {
//		when(contactRepository.findById(1)).thenReturn(Optional.empty());
//		assertNull(contactService.getContact(1));

//	}

//	@Test
//	void addContactTest() {
//		Contact createContactRequest = new Contact("One", "Surname1One", "Surname2One",
//				666555444, "contact-one@gmail.com");
//		ContactDTO createContactRequestDTO = ContactMapper.INSTANCE.contactToContactDto(createContactRequest);
//		Contact contact = contactService.fromCreateContactRequest(createContactRequestDTO);
//		contact.setId(1);
//		
//		when(contactRepository.save(any(Contact.class))).thenReturn(contact);
//		String newContactName = contactService.createContact(createContactRequestDTO).getName();
//
//		assertNotNull(newContactName);
//		assertEquals("One", newContactName);
//	}

//	@Test
//	void editContactTest() {
//		Contact editContactRequest = new Contact(1, "OneEdit", "Surname1OneEdit", "Surname2OneEdit",
//				666555444, "contact-one-edit@gmail.com");
//		ContactDTO editContactRequestDTO = ContactMapper.INSTANCE.contactToContactDto(editContactRequest);
//		Contact contact = contactService.fromCreateContactRequest(editContactRequestDTO);
//		contact.setId(1);
//		
//		when(contactRepository.save(any(Contact.class))).thenReturn(contact);
//
//		Integer editContactId = contactService.editContact(editContactRequestDTO);
//
//		assertNotNull(editContactId);
//		assertEquals(1, editContactId);
//	}
	
	@Test
	void deleteContactTest() {
		Integer result = contactService.deleteContact(1);

		assertNotNull(result);
	}

}
